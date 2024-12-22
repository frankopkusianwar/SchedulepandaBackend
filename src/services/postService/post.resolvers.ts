import { GraphQLError } from "graphql";
import { prisma } from "../../server";

export const postResolvers = {
    Query: {
      getPostedPosts: async (_:any,{clerkID}:{clerkID:string}) => {
        try {
          const postedPosts = await prisma.post.findMany({
            where:{
              clerkId:clerkID,
              status:"published"
            }
          })

          return postedPosts
        } catch (error:any) {
          return new GraphQLError(error)
        }
    },

    getScheduledPosts: async (_:any,{clerkID}:{clerkID:string}) => {
      try {
        const scheduledPosts = await prisma.post.findMany({
          where:{
            clerkId:clerkID,
            status:"scheduled"
          }
        })

        return scheduledPosts
      } catch (error:any) {
        return new GraphQLError(error)
      }
  },

      getDraftPosts: async (_:any,{clerkID}:{clerkID:string}) => {
          try {
            const drafts = await prisma.post.findMany({
              where:{
                clerkId:clerkID,
                status:"draft"
              }
            })

            return drafts
          } catch (error:any) {
            return new GraphQLError(error)
          }
      },
    },

    Post:{
      platforms:async({id}:{id:string},_:any)=>{
        try {

          const platforms = await prisma.platform.findMany({
            where:{
              posts:{
                some:{
                  id:id
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

      draftPost: async (_: any, args: {text: string, date: Date, time:string, hashTags:string, clerkID:string,platformIds:string[] }) => {
        try {

          const draft = await prisma.post.create({
            data: {
              text: args.text,
              date: args.date, 
              time: args.time,                      
              hashTags: args.hashTags,  
              status:"draft",           
              clerkId:args.clerkID,
              platforms:{
                connect:args.platformIds.map((_id)=>{
                  return {
                    id:_id
                  }
                })
              }
            },
          });

          return draft
          
        } catch (error:any) {
          return new GraphQLError(error)
        }
      },


      postNow: async (_: any, args: { text: string, date: Date, time:string,hashTags:string, clerkID:string,platformIds:string[] }) => {
        try {
         

         
         //this implementation is unique to only linked in
         //TODO structure code to support more platforms

         const url = 'https://api.linkedin.com/v2/ugcPosts';

         //get connection with this user clerkID and the first plartform id
         //TODO improve

         const conn = await prisma.connection.findFirst({
          where:{
            clerkId:args.clerkID,
            platformId:args.platformIds[0]
          }
         })


         if(!conn){
           return new GraphQLError("You have no connections")
         }

         //TODO check if token has expired


         // First, get the user's LinkedIn URN (unique identifier)
          const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
            headers: {
              'Authorization': `Bearer ${conn.token}`,
              'Content-Type': 'application/json',
            },
          });

          

          if(!profileResponse){
            return new GraphQLError("Failed to get user URN")
          }

          const profileData:any = await profileResponse.json();
         

          const authorURN = `urn:li:person:${profileData.id}`;


            // Create the post
            const postData = {
              author: authorURN,
              lifecycleState: 'PUBLISHED',
              specificContent: {
                'com.linkedin.ugc.ShareContent': {
                  shareCommentary: {
                    text: args.text
                  },
                  shareMediaCategory: 'NONE'
                }
              },
              visibility: {
                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
              }
            };


            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${conn.token}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
              },
              body: JSON.stringify(postData)
            });



            if (!response.ok) {
              const errorData = await response.text();
              return new GraphQLError(`Failed to make post ${errorData}`)
            }


          const post = await prisma.post.create({
            data: {
              text: args.text,
              date: args.date, 
              time: args.time,                      
              hashTags: args.hashTags,             
              clerkId:args.clerkID,
              status:"published",
              platforms:{
                connect:args.platformIds.map((_id)=>{
                  return {
                    id:_id
                  }
                })
              }
            },
          });


          if(post){
            //TODO post to connected platforms
          }


          return post
          
        } catch (error:any) {
          return new GraphQLError(error)
        }
      },

      schedulePost: async (_: any, args: { text: string, date: Date, time:string,hashTags:string,clerkID:string,platformIds:string[]}) => {
        try {

          const post = await prisma.post.create({
            data: {
              text: args.text,
              date: args.date, 
              time: args.time,                      
              hashTags: args.hashTags,             
              clerkId:args.clerkID,
              status:"scheduled",
              platforms:{
                connect:args.platformIds.map((_id)=>{
                  return {
                    id:_id
                  }
                })
              }
            },
          });

          return post
          
        } catch (error:any) {
          return new GraphQLError(error)
        }
      },



      updatePost: async (_: any, args: {id: string, description: string, date: Date, time:string, platform: string, postingSchedule: string, hashTags:string, clerkID:string }) => {
        return prisma.post.update({
          where: { id: args.id },
          data: {
              text: args.description,
              date: args.date, 
              time: args.time,               
              hashTags: args.postingSchedule,             
              clerkId: args.clerkID,
          },
        });
      },
    },
  };
  