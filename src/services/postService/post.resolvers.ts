import { GraphQLError } from "graphql";
import { prisma } from "../../server";

export const postResolvers = {
    Query: {
      getPostedPosts: async (_:any,{clerkID}:{clerkID:string}) => {
        try {
          const postedPosts = await prisma.post.findMany({
            where:{
              clerkId:clerkID,
              status:"posted"
            }
          })

          return postedPosts
        } catch (error:any) {
          return new GraphQLError(error, {
            extensions:{
                code:"INTERNAL SERVER ERROR",
                status:500
            }
         })
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
        return new GraphQLError(error, {
          extensions:{
              code:"INTERNAL SERVER ERROR",
              status:500
          }
       })
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
            return new GraphQLError(error, {
              extensions:{
                  code:"INTERNAL SERVER ERROR",
                  status:500
              }
           })
          }
      },
    },
    Mutation: {

      draftPost: async (_: any, args: {text: string, date: Date, time: Date, hashTags:string, clerkID:string }) => {
        try {

          const draft = await prisma.post.create({
            data: {
              text: args.text,
              date: args.date, 
              time: args.time,                      
              hashTags: args.hashTags,  
              status:"draft",           
              clerkId:args.clerkID
            },
          });

          return draft
          
        } catch (error:any) {
          return new GraphQLError(error, {
            extensions:{
                code:"INTERNAL SERVER ERROR",
                status:500
            }
         })
        }
      },


      postNow: async (_: any, args: { text: string, date: Date, time: Date,hashTags:string, clerkID:string }) => {
        try {

          const post = await prisma.post.create({
            data: {
              text: args.text,
              date: args.date, 
              time: args.time,                      
              hashTags: args.hashTags,             
              clerkId:args.clerkID,
              status:"posted"
            },
          });


          if(post){
            //TODO post to connected platforms
          }


          return post
          
        } catch (error:any) {
          return new GraphQLError(error, {
            extensions:{
                code:"INTERNAL SERVER ERROR",
                status:500
            }
         })
        }
      },

      schedulePost: async (_: any, args: { text: string, date: Date, time: Date,hashTags:string,clerkID:string}) => {
        try {

          const post = await prisma.post.create({
            data: {
              text: args.text,
              date: args.date, 
              time: args.time,                      
              hashTags: args.hashTags,             
              clerkId:args.clerkID,
              status:"scheduled"
            },
          });

          return post
          
        } catch (error) {
          
        }
      },



      updatePost: async (_: any, args: {id: string, description: string, date: Date, time: Date, platform: string, postingSchedule: string, hashTags:string, clerkID:string }) => {
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
  