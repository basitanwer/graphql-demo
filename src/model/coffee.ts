import axios from "axios";
import { Field, InputType, ObjectType } from "type-graphql";

/**
 * Coffee information from random-data-api.com
 */
interface CoffeeAPI {
  id: string;
  blend_name: string;
  origin: string;
  variety: string;
}

@InputType("CoffeeInput")
@ObjectType()
export class Coffee {
  @Field()
  id: number;
  @Field()
  blendName: string;
  @Field()
  origin: string;
  @Field()
  variety: string;

  /**
   * Randomly generates coffee object
   * @param id id to search for
   * @returns gets coffee object randomly then injects the same id.
   */
  static async getById(id: number) {
    let coffee = new Coffee();
    try {
      let res = await axios.get("https://random-data-api.com/api/coffee/random_coffee");
      let json: CoffeeAPI = (await res.data) as CoffeeAPI;
      coffee.id = id;
      coffee.blendName = json.blend_name;
      coffee.origin = json.origin;
      coffee.variety = json.variety;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      return coffee;
    }
  }

  static async getList() {
    let coffees: Coffee[] = [];
    try {
      let res = await axios.get("https://random-data-api.com/api/coffee/random_coffee?size=10");
      let json: CoffeeAPI[] = (await res.data) as CoffeeAPI[];
      json.forEach((item) => {
        let coffee = new Coffee();
        coffee.id = parseInt(item.id);
        coffee.blendName = item.blend_name;
        coffee.origin = item.origin;
        coffee.variety = item.variety;
        coffees.push(coffee);
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      return coffees;
    }
  }

  static async updateCoffee(coffee: Coffee) {
    console.log(coffee);
    return true;
  }
}
