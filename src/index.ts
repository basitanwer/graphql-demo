import express from "express";
import { loadEnv } from "./util/config";

let app = express();
let env = loadEnv();

console.log("Env Variables: " + JSON.stringify(env, undefined, 2));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(env.PORT, () => {
  console.log(`Example app listening on port ${env.PORT}`);
});
