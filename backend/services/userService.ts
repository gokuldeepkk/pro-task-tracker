import Container, { Service } from "typedi";
import { BaseService } from "./common/baseService";
import { CreateUserRequest } from "@models/User";
import { DBGateway } from "@gateways/dbGateway";
import { COLLECTION } from "utils/constants/database";

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
}
