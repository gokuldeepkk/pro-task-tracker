import { Schema, model, Document, Types, Connection } from "mongoose";

export interface IProject extends Document {
  name: string;
  description?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

ProjectSchema.virtual("id").get(function (this: IProject) {
  return (this._id as Types.ObjectId).toHexString();
});

ProjectSchema.pre<IProject>("save", async function (next) {
  // Additional pre-save logic can be added here if needed
  if (this.isNew) {
    const now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
  } else {
    this.updatedAt = new Date();
  }
  next();
});

export function createProjectModel(connection: Connection) {
  return connection.model<IProject>("Project", ProjectSchema);
}
