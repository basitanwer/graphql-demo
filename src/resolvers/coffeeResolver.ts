import { Coffee } from "../model/coffee";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../util/context";

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
  async updateCoffee(@Ctx() ctx: Context, @Arg("coffee", () => Coffee) coffee: Coffee) {
    console.log(ctx.user);
    return await Coffee.updateCoffee(coffee);
  }
}
