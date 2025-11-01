import mongoose from "mongoose";
import { Service } from "typedi";

@Service()
export class DatabaseService {
  private readonly DB_URL: string =
    "mongodb+srv://gokuldeep:EBFEVzawsGSFUNSW@cluster0.dutsujl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  private connection: mongoose.Connection | null = null;

  private async connect(): Promise<mongoose.Connection> {
    try {
      this.connection = await mongoose.createConnection(this.DB_URL);
      return this.connection;
    } catch (error) {
      console.error("Database connection error:", error);
      throw error;
    }
  }

  public async getConnection(): Promise<mongoose.Connection> {
    if (!this.connection) {
      this.connection = await this.connect();
    }
    return this.connection as mongoose.Connection;
  }
}
