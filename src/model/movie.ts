import axios from "axios";
import { Field, ObjectType } from "type-graphql";

/**
 * Coffee information from random-data-api.com
 */
interface CoffeeAPI {
  blend_name: string;
  origin: string;
  variety: string;
}

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
}
