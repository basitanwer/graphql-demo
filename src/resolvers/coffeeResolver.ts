import { Coffee } from "../model/movie";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class CoffeeResolver {
  @Query(() => Coffee)
  async getCoffee(@Arg("id") id: number) {
    return await Coffee.getById(id);
  }

  @Query(() => [Coffee])
  async getListOfCoffee() {
    return await Coffee.getList();
  }
}
