import { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DemoResolver } from "./resolvers/demoResolver";

export async function createApolloServer(app: Express) {
  let apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DemoResolver],
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return apolloServer;
}
