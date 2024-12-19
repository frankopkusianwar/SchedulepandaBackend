"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDefs = void 0;
exports.postDefs = `
  scalar DateTime

  type Post {
    id:                 String!
    description:        String!
    date:               DateTime!
    time:               DateTime!
    platform:           String!
    postingSchedule:    String!
    hashTags:           String!
    createdAt:          DateTime! 
    updatedAt:          DateTime! 
    userId:             String! 
  }

  type Query {
    posts: [Post!]!
    post(id: String!): Post
  }

  type Mutation {
    createPost(description: String!, date: DateTime!, time: DateTime!, platform: String!, postingSchedule: String!, hashTags: String!, userId: String!): Post!
    updatePost(id: String!, description: String!, date: DateTime!, time: DateTime!, platform: String!, postingSchedule: String!, hashTags: String!, userId: String!): Post!
  }
`;
