import { GraphQLError } from "graphql";
import { prisma } from "../../server";



interface LinkedInAccessCodeRes {  
  access_token:string
  expires_in:number
  scope:string
  }

export const platformResolvers = {
    Query: {
        getAllSurpportedPlatforms: async () => {
           try {

            const platforms = await prisma.platform.findMany()
            return platforms
           } catch (error:any) {
             return new GraphQLError(error)
           }
      },
      getUserPlatforms:async(_:any,{clerkId}:{clerkId:string})=>{
        try {

          const platforms = await prisma.platform.findMany({
            where:{
                users:{
                    some:{
                        clerkId
                    }
                }
            }
          })

          return platforms
            
        } catch (error:any) {
            return new GraphQLError(error)
        }
      }
    },
    Mutation: {
        addPlatform: async (_: any, args: { name: string, iconUrl: string }) => {
       

        try {

            const platform = await prisma.platform.create({
                data: {
                  name:args.name,
                  iconUrl:args.iconUrl
                },
              });

              return platform
            
        } catch (error:any) {
            return new GraphQLError(error)
        }
      },
      connectUserToAplatform:async(_:any,args:{platformId:string,clerkId:string,code:string})=>{
        try {

          console.log("conn called ------->")
            //implement deffrent ways of connecting to diffrent platforms

            //linked in 
            const params = new URLSearchParams({
              grant_type: 'authorization_code',
              code: args.code,
              client_id: process.env.LINKEDIN_CLIENT_ID,
              client_secret: process.env.LINKEDIN_CLIENT_SECRET,
              redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
            });
            
            const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: params.toString(),
            });


            if (!response.ok) {
              const errorText = await response.text();
              return new GraphQLError(`Failed to get access token: ${response.statusText} - ${errorText}`)
            }

            const data:any = await response.json();
            
            console.log(data,'--------> dataaa')
            const persitedConn = await prisma.connection.create({
              data:{
                token:data.access_token,
                expires:data.expires_in,
                platformId:args.platformId,
                clerkId:args.clerkId
              }
            })


            if(!persitedConn){
                //TODO handle err
            }
            
             
            const updatedUser = await prisma.user.update({
                where:{
                    clerkId:args.clerkId
                },
                data:{
                   platforms:{
                    connect:[{id:args.platformId}]
                   }
                }
            })

            return updatedUser
            
        } catch (error:any) {
            return new GraphQLError(error)
        }
      },
      disconnectUserFromPlatform:async(_:any,args:{platformId:string,clerkId:string})=>{
        try {

            const updatedUser = await prisma.user.update({
                where:{
                    clerkId:args.clerkId
                },
                data:{
                   platforms:{
                    disconnect:[{id:args.platformId}]
                   }
                }
            })

            return updatedUser
            
        } catch (error:any) {
            return new GraphQLError(error)
        }
      }
    }
     
  };
  