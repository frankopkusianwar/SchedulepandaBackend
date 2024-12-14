import { prisma } from "../../server";

export const postResolvers = {
    Query: {
      posts: async () => {
        return prisma.user.findMany()
      },

      post: async (_: any, args: { id: string }) => {
        return prisma.post.findUnique({
          where: { id: args.id },
        });
      },
    },
    Mutation: {
      createPost: async (_: any, args: { description: string, date: Date, time: Date, platform: string, postingSchedule: string, hashTags:string, userId:string }) => {
        return prisma.post.create({
          data: {
            description: args.description,
            date: args.date, 
            time: args.time,              
            platform: args.platform,       
            postingSchedule: args.postingSchedule,  
            hashTags: args.postingSchedule,             
            userId: args.userId,
          },
        });
      },
      updatePost: async (_: any, args: {id: string, description: string, date: Date, time: Date, platform: string, postingSchedule: string, hashTags:string, userId:string }) => {
        return prisma.post.update({
          where: { id: args.id },
          data: {
              description: args.description,
              date: args.date, 
              time: args.time,              
              platform: args.platform,       
              postingSchedule: args.postingSchedule,  
              hashTags: args.postingSchedule,             
              userId: args.userId,
          },
        });
      },
    },
  };
  