import { Query, Resolver } from "type-graphql";

@Resolver()
export class DemoResolver {
  @Query(() => String)
  async hello() {
    return "hi!";
  }
}
