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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const typeDefs_1 = require("../src/graphql/typeDefs");
const resolvers_1 = require("../src/graphql/resolvers");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const schema_1 = require("@graphql-tools/schema");
const http_1 = __importDefault(require("http"));
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
exports.prisma = new client_1.PrismaClient(); // Prisma Client
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const httpServer = http_1.default.createServer(app);
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
const server = new server_1.ApolloServer({
    schema,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }), {
            serverWillStart() {
                return __awaiter(this, void 0, void 0, function* () {
                    return {
                        drainServer() {
                            return __awaiter(this, void 0, void 0, function* () {
                            });
                        }
                    };
                });
            }
        }
    ]
});
// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });
// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
//Graphql endpoint
app.use("gql", (0, express4_1.expressMiddleware)(server));
httpServer.listen(port, () => {
    console.log(`Server is running on port ${port} }`);
});
