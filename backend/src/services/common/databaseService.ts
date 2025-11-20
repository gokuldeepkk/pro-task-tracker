import mongoose from "mongoose";
import { Service } from "typedi";

@Service()
export class DatabaseService {
  private connection: mongoose.Connection | null = null;

  private async connect(): Promise<mongoose.Connection> {
    try {
      this.connection = await mongoose.createConnection(
        this.formDatabaseConnectionString(),
        {
          serverSelectionTimeoutMS: 15000,
          socketTimeoutMS: 45000,
          bufferCommands: true,
          maxPoolSize: 10,
        }
      );
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

  private formDatabaseConnectionString(): string {
    const connString =
      "mongodb+srv://" +
      process.env.DB_USER +
      ":" +
      process.env.DB_PASSWORD +
      "@" +
      process.env.DB_HOST +
      "/" +
      process.env.DB_NAME +
      "?retryWrites=true&w=majority&appName=" +
      process.env.DB_NAME;

    return connString;
  }
}
