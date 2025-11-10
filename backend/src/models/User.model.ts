import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  userPermission?: "user" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: false },
  userPermission: { type: String, enum: ["user", "admin"], default: "user" },
});

UserSchema.pre<IUser>("save", async function (next) {
  // Check if the password field is new or has been modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    // Pass any error to Mongoose
    next(error as Error);
  }
});

// Attach a custom method to the User model for easy password checking
UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Export the Mongoose Model
export const UserModel = mongoose.model<IUser>("User", UserSchema);
