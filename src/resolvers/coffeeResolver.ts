import { Coffee } from "../model/movie";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

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

  @Mutation(() => Boolean)
  async updateCoffee(@Arg("coffee", () => Coffee) coffee: Coffee) {
    return await Coffee.updateCoffee(coffee);
  }
}
