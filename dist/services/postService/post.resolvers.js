"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolvers = void 0;
const server_1 = require("../../server");
exports.postResolvers = {
    Query: {
        posts: () => __awaiter(void 0, void 0, void 0, function* () {
            return server_1.prisma.user.findMany();
        }),
        post: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return server_1.prisma.post.findUnique({
                where: { id: args.id },
            });
        }),
    },
    Mutation: {
        createPost: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return server_1.prisma.post.create({
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
        }),
        updateUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            return server_1.prisma.post.update({
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
        }),
    },
};
