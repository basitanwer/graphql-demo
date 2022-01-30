import axios from "axios";
import { Field, ObjectType, registerEnumType } from "type-graphql";

export enum Role {
  ADMIN = "ADMIN",
  VIEWER = "VIEWER",
}

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;
  @Field(() => Role)
  role: Role;

  static async createDummyUser() {
    let user = new User();
    try {
      let res = (await axios.get("https://random-data-api.com/api/users/random_user")).data as {
        first_name: string;
        id: string;
      };
      user.id = res.id;
      user.name = res.first_name;
      user.role = Role.ADMIN;
    } finally {
      return user;
    }
  }
}

registerEnumType(Role, {
  name: "Role",
  description: "Available roles for users",
});
