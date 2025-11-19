import { Document, Schema, Connection, Types } from "mongoose";
import * as bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  permission?: "user" | "admin";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    permission: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        if (ret?._id) delete (ret as any)._id;
        if (ret?.__v) delete (ret as any).__v;
        if (ret?.password) delete (ret as any).password;
        return ret;
      },
    },
  }
);

UserSchema.virtual("id").get(function (this: IUser) {
  return (this._id as Types.ObjectId).toHexString();
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

// Export a function to create the model with a specific connection
export function createUserModel(connection: Connection) {
  return connection.model<IUser>("User", UserSchema);
}
