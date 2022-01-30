import { CoffeeResolver } from "./resolvers/coffeeResolver";
import { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { DemoResolver } from "./resolvers/demoResolver";
import { User } from "./model/user";
import { Context } from "./util/context";

export async function createApolloServer(app: Express) {
  let apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DemoResolver, CoffeeResolver],
    }),
    context: async ({ req, res }): Promise<Context> => {
      return {
        user: await User.createDummyUser(),
        req: req,
        res: res,
      };
    },
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  return apolloServer;
}
