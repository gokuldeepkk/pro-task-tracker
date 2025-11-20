import { UserService } from "@services/userService";
import { Body, Controller, Get, Header, Post } from "routing-controllers";
import { CreateUserRequest, LoginRequest } from "src/dto/User.dto";
import { BASE_ROUTES, PUBLIC_ROUTES } from "src/utils/constants/routes";
import { ResponseUtil } from "src/utils/responseUtil";
import Container from "typedi";

@Controller(BASE_ROUTES.public)
export class OpenController {
  constructor(
    private userService: UserService,
    private responseUtil: ResponseUtil
  ) {
    this.userService = Container.get(UserService);
    this.responseUtil = Container.get(ResponseUtil);
  }

  @Get("/")
  @Header("Content-Type", "text/html")
  entryEndpoint() {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>HTML Response</title>
                <style>
                    body { font-family: sans-serif; background-color: #f0f0f0; }
                    .container { margin: 50px; padding: 20px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello from pro-task manager</h1>
                    <p>This will serve as the entry point for the API.</p>
                </div>
            </body>
            </html>
        `;
  }

  @Get(PUBLIC_ROUTES.health)
  healthCheck() {
    return { status: "OK", timestamp: new Date().toISOString() };
  }

  @Post(PUBLIC_ROUTES.signin)
  async loginUser(@Body({ required: true }) payload: LoginRequest) {
    try {
      return await this.userService.loginUser(payload);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }

  @Post(PUBLIC_ROUTES.register)
  async createUser(@Body({ required: true }) payload: CreateUserRequest) {
    try {
      return await this.userService.createUser(payload);
    } catch (error) {
      return this.responseUtil.error(error);
    }
  }
}
