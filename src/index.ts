import "reflect-metadata";
import express from "express";
import { createApolloServer } from "./graphQLServer";
import { loadEnv } from "./util/config";

let app = express();
let env = loadEnv();
(async () => {
  console.log("Env Variables: " + JSON.stringify(env, undefined, 2));

  await createApolloServer(app);

  app.get("/", (_, res) => {
    res.send("Hello World!");
  });

  app.listen(env.PORT, () => {
    console.log(`Example app listening on port ${env.PORT}`);
  });
})();
