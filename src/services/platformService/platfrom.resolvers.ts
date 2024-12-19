import { GraphQLError } from "graphql";
import { prisma } from "../../server";

export const platformResolvers = {
    Query: {
        getAllSurpportedPlatforms: async () => {
           try {

            const platforms = await prisma.platform.findMany()
            return platforms
           } catch (error:any) {
             return new GraphQLError(error, {
                extensions:{
                    code:"INTERNAL SERVER ERROR",
                    status:500
                }
             })
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
            return new GraphQLError(error, {
                extensions:{
                    code:"INTERNAL SERVER ERROR",
                    status:500
                }
             })
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
            return new GraphQLError(error, {
                extensions:{
                    code:"INTERNAL SERVER ERROR",
                    status:500
                }
             })
        }
      },
      connectUserToAplatform:async(_:any,args:{platformId:string,clerkId:string})=>{
        try {


            //implement deffrent ways of connecting to diffrent platforms

            //linked in 
            

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
            return new GraphQLError(error, {
                extensions:{
                    code:"INTERNAL SERVER ERROR",
                    status:500
                }
             })
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
            return new GraphQLError(error, {
                extensions:{
                    code:"INTERNAL SERVER ERROR",
                    status:500
                }
             })
        }
      }
    }
     
  };
  