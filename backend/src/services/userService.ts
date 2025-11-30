import Container, { Service } from "typedi";
import { CreateUserRequest, LoginRequest } from "src/dto/User.dto";
import { UserRepository } from "src/repositories/userRepository";
import { LoggerService } from "./common/loggerService";
import { ResponseUtil } from "src/utils/responseUtil";

@Service()
export class UserService {
  private readonly userRepository: UserRepository;

  constructor(private logger: LoggerService, private response: ResponseUtil) {
    this.userRepository = Container.get<UserRepository>(UserRepository);
  }

  // User service methods will go here
  async createUser(data: CreateUserRequest) {
    try {
      this.logger.info("Creating user...");
      const user = await this.userRepository.save(data);
      this.logger.info("User created successfully");
      return this.response.success(user);
    } catch (error) {
      this.logger.error("Error creating user", error);
      return this.response.error("Error creating user");
    }
  }

  async loginUser(data: LoginRequest) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return this.response.error("Invalid email or password");
    }
    const validCred = await this.userRepository.comparePassword(
      data.password,
      user?.password ?? ""
    );
    if (!validCred) {
      return this.response.error("Invalid email or password");
    }
    return this.response.success(JSON.parse(JSON.stringify(user.toJSON())));
  }

  async getUserByEmail(email: string) {
    this.logger.info(`Fetching user by email: ${email}`);
    const user = await this.userRepository.findByEmail(email);
    return this.response.success(user);
  }
}
