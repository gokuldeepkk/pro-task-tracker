import { Body, JsonController, Post } from "routing-controllers";
import { UserService } from "@services/userService";
import Container from "typedi";
import { CreateUserRequest, LoginRequest } from "src/dto/User";
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

  @Post("/login")
  async loginUser(@Body({ required: true }) payload: LoginRequest) {
    try {
      return await this.userService.loginUser(payload);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }
}
