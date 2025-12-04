import {
  Body,
  Get,
  HeaderParam,
  JsonController,
  Post,
} from "routing-controllers";
import { UserService } from "@services/userService";
import { Service } from "typedi";
import { ResponseUtil } from "../utils/responseUtil";
import { BASE_ROUTES, MODULES } from "src/utils/constants/routes";

@Service()
@JsonController(BASE_ROUTES.secure + MODULES.users)
export class UserController {
  constructor(
    private userService: UserService,
    private responseUtil: ResponseUtil
  ) {}

  @Get("/")
  async getAllUsers() {
    try {
      // const users = await userService.getAllUsers();
      return this.responseUtil.success({
        message: "Fetched users successfully",
        data: [],
      });
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }

  @Get("/email")
  async getUserByEmail(@HeaderParam("email") email: string) {
    return await this.userService.getUserByEmail(email);
  }
}
