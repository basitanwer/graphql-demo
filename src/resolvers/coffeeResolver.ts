import { Coffee } from "../model/coffee";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../util/context";
import { Role } from "../model/user";

@Resolver()
export class CoffeeResolver {
  @Query(() => Coffee)
  async getCoffee(@Arg("id") id: number) {
    return await Coffee.getById(id);
  }

  @Authorized()
  @Query(() => [Coffee])
  async getListOfCoffee() {
    return await Coffee.getList();
  }

  @Authorized<Role>(Role.ADMIN)
  @Mutation(() => Boolean)
  async updateCoffee(@Ctx() ctx: Context, @Arg("coffee", () => Coffee) coffee: Coffee) {
    console.log(ctx.user);
    return await Coffee.updateCoffee(coffee);
  }
}
