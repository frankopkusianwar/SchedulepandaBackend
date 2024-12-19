

export const postDefs = /* GraphQL */ `
  scalar DateTime

  type Post {
    id:                 String
    text:               String
    date:               DateTime
    time:               String
    hashTags:           String
    createdAt:          DateTime 
    updatedAt:          DateTime 
    clerkId:            String
    platforms:          [Platform]
  }


  type Platform {
    id:String
    name:String
    iconUrl:String    
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
      time: String,  
      hashTags: String!, 
      clerkID:ID!
      platformIds:[String!]!
      ): Post!

      postNow(
      text: String!,
      date: DateTime, 
      time: String,  
      hashTags: String!, 
      clerkID:ID!
      platformIds:[String!]!
      ): Post!


      schedulePost(
      text: String!,
      date: DateTime!, 
      time: String!,  
      hashTags: String!, 
      clerkID:ID!
      platformIds:[String!]!
      ): Post!

       updatePost(id: String!, description: String!, date: DateTime!, time: String!, platform: String!, postingSchedule: String!, hashTags: String!, clerkID: String!): Post!
  }
`;
