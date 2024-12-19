

export const platformTypes = /* GraphQL */ `
  scalar DateTime

  type Platform {
    id:String
    name:String
    iconUrl:String    
  }

  type Query {
    getAllSurpportedPlatforms: [Platform]
    getUserPlatforms(clerkId:ID!):[Platform]
  }

  type Mutation {
    addPlatform(
        name:String!,
        iconUrl:String!
    ):Platform!

    connectUserToAplatform(platformId:ID!,clerkId:ID!):Platform!
    disconnectUserFromPlatform(platformId:ID!,clerkId:ID!):Platform!
  }
`;
