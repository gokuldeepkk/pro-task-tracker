import { Service } from "typedi";
import Container from "typedi";
import { createUserModel, IUser } from "../models/User.model";
import { DatabaseService } from "../services/common/databaseService";
import { Model } from "mongoose";

@Service()
export class UserRepository {
  private UserModel: Model<IUser> | null = null;

  constructor(private dbService: DatabaseService) {}

  private async ensureModel(): Promise<Model<IUser>> {
    if (!this.UserModel) {
      const connection = await this.dbService.getConnection();
      this.UserModel = createUserModel(connection);
    }
    return this.UserModel;
  }

  public async save(userData: Partial<IUser>): Promise<IUser> {
    const UserModel = await this.ensureModel();
    const user = new UserModel(userData);
    const savedUser = await user.save();
    return JSON.parse(JSON.stringify(savedUser.toJSON()));
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const UserModel = await this.ensureModel();
    const user = await UserModel.findOne({ email });
    return JSON.parse(JSON.stringify(user?.toJSON() || null));
  }

  public async comparePassword(
    candidatePassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const UserModel = await this.ensureModel();
    const dummyUser = new UserModel({ password: hashedPassword });
    return dummyUser.comparePassword(candidatePassword);
  }
}
