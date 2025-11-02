import Container, { Service } from "typedi";
import { BaseService } from "./common/baseService";
import { CreateUserRequest, LoginRequest } from "src/dto/User";
import { DBGateway } from "src/gateways/dbGateway";
import { COLLECTION } from "../utils/constants/database";

@Service()
export class UserService extends BaseService {
  private readonly dbGateway: DBGateway;

  constructor() {
    super();
    this.dbGateway = Container.get<DBGateway>(DBGateway);
  }

  // User service methods will go here
  async createUser(data: CreateUserRequest) {
    this.logger.info("Creating user...");
    await this.dbGateway.insertDocument(COLLECTION.users, data);
    return this.response.success({ message: "User created", data });
  }

  async loginUser(data: LoginRequest) {
    this.logger.info("Logging in user...");
    const user = await this.dbGateway.readDocument(
      COLLECTION.users,
      {
        email: data.email,
        password: data.password,
      },
      { password: 0 }
    );
    if (!user) {
      return this.response.error("Invalid email or password");
    }
    return this.response.success({ message: "Login successful", data: user });
  }
}
