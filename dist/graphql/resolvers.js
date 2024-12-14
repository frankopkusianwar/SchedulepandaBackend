"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const post_resolvers_1 = require("../services/postService/post.resolvers");
exports.resolvers = (0, merge_1.mergeResolvers)([
    post_resolvers_1.postResolvers
]);
