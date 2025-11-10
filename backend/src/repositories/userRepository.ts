import { Service } from "typedi";
import { UserModel, IUser } from "../models/User.model";

@Service()
export class UserRepository {
  public async save(userData: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(userData);
    return user.save();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email });
  }
}
