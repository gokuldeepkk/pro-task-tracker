import { Body, JsonController, Post } from "routing-controllers";
import { UserService } from "@services/userService";
import Container from "typedi";
import { CreateUserRequest } from "@models/User";
import { ResponseUtil } from "utils/responseUtil";

@JsonController("/users")
export class UserController {
  constructor(
    private userService: UserService,
    private responseUtil: ResponseUtil
  ) {
    this.userService = Container.get<UserService>(UserService);
    this.responseUtil = Container.get<ResponseUtil>(ResponseUtil);
  }

  @Post("/")
  async createUser(@Body({ required: true }) payload: CreateUserRequest) {
    try {
      return await this.userService.createUser(payload);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }
}
