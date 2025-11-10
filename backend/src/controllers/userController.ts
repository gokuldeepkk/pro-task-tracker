import { Body, Get, JsonController, Post } from "routing-controllers";
import { UserService } from "@services/userService";
import Container from "typedi";
import { CreateUserRequest, LoginRequest } from "src/dto/User.dto";
import { ResponseUtil } from "../utils/responseUtil";
import { BASE_ROUTES, MODULES } from "src/utils/constants/routes";

@JsonController(BASE_ROUTES.secure + MODULES.users)
export class UserController {
  @Get("/")
  async getAllUsers() {
    const userService = Container.get(UserService);
    const responseUtil = Container.get(ResponseUtil);
    try {
      // const users = await userService.getAllUsers();
      return responseUtil.success({
        message: "Fetched users successfully",
        data: [],
      });
    } catch (error) {
      return responseUtil.error(error);
    }
  }
}
