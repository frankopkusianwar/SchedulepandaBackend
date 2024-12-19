import { mergeResolvers} from "@graphql-tools/merge";
import { postResolvers } from "../services/postService/post.resolvers";
import { platformResolvers } from "../services/platformService/platfrom.resolvers";


export const resolvers = mergeResolvers([
  postResolvers,
  platformResolvers
])