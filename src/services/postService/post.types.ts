

export const postDefs = /* GraphQL */ `
  scalar DateTime

  type Post {
    id:                 String!
    text:               String!
    date:               DateTime!
    time:               DateTime!
    hashTags:           String!
    createdAt:          DateTime! 
    updatedAt:          DateTime! 
    clerkId:             String! 
  }

  type Query {
    getPostedPosts(clerkID:ID!): [Post!]!
    getScheduledPosts(clerkID:ID!): [Post!]!
    getDraftPosts(clerkID:ID!): [Post!]!
    
  }

  type Mutation {
    draftPost(
      text: String!,
      date: DateTime, 
      time: DateTime,  
      hashTags: String!, 
      clerkID:ID!
      ): Post!

      postNow(
      text: String!,
      date: DateTime, 
      time: DateTime,  
      hashTags: String!, 
      clerkID:ID!
      ): Post!


      schedulePost(
      text: String!,
      date: DateTime!, 
      time: DateTime!,  
      hashTags: String!, 
      clerkID:ID!
      ): Post!

       updatePost(id: String!, description: String!, date: DateTime!, time: DateTime!, platform: String!, postingSchedule: String!, hashTags: String!, clerkID: String!): Post!
  }
`;
