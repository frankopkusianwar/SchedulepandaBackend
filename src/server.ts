import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import {typeDefs}  from "../src/graphql/typeDefs"
import { resolvers } from '../src/graphql/resolvers';
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from "http"
import {ApolloServerPluginDrainHttpServer}  from "@apollo/server/plugin/drainHttpServer"
import cors from "cors"
import bodyParser from 'body-parser';
import userRouter from './services/userService/user.routes';



export const prisma = new PrismaClient();   // Prisma Client

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

const httpServer = http.createServer(app)
const schema = makeExecutableSchema(
  {
    typeDefs,
    resolvers
  }
)

const server = new ApolloServer(
  {
    schema,
    plugins:[
       ApolloServerPluginDrainHttpServer({httpServer}),{
         async serverWillStart(){
           return {
              async drainServer(){
                
              }
           }
         }
       }
    ]
  }
);


app.use(cors(),bodyParser.json());

 app.use("/api", userRouter);

//Graphql endpoint
(
  async()=>{
    await server.start()
    app.use("/gql", expressMiddleware(server))

  }
)()

httpServer.listen( port, ()=>{
  console.log(`Server is running on port ${port}`);
})
