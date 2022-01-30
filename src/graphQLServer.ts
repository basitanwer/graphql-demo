import { CoffeeResolver } from "./resolvers/coffeeResolver";
import { Express } from "express";
import { ApolloServer } from "apollo-server-express";
import { AuthChecker, buildSchema } from "type-graphql";
import { DemoResolver } from "./resolvers/demoResolver";
import { User } from "./model/user";
import { Context } from "./util/context";

export async function createApolloServer(app: Express) {
  let apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DemoResolver, CoffeeResolver],
      authChecker: authChecker,
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

const authChecker: AuthChecker<Context> = (authContext, roles) => {
  let user = authContext.context.user;
  if (roles.length === 0) {
    // if `@Authorized()`, check only if user exists
    return user !== null || user !== undefined;
  }

  if (!user) {
    // and if no user, restrict access
    return false;
  }

  if (roles.includes(user.role)) {
    // grant access if the roles overlap
    return true;
  }

  // no roles matched, restrict access
  return false;
};
