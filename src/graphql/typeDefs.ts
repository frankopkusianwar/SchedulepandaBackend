import { mergeTypeDefs } from "@graphql-tools/merge";
import { postDefs } from "../services/postService/post.types";
import { platformTypes } from "../services/platformService/platform.types";


export const typeDefs = mergeTypeDefs([
    postDefs,
    platformTypes
])