"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const post_types_1 = require("../services/postService/post.types");
exports.typeDefs = (0, merge_1.mergeTypeDefs)([
    post_types_1.postDefs
]);
