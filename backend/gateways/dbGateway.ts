import { DatabaseService } from "@services/common/databaseService";
import mongoose from "mongoose";
import Container, { Service } from "typedi";

@Service()
export class DBGateway {
  private dbConnection: mongoose.Connection | null = null;
  constructor(private dbService: DatabaseService) {
    // Initialization code, if needed
    this.dbService = Container.get<DatabaseService>(DatabaseService);
  }

  async setupConnection() {
    const connection = await this.dbService.getConnection();
    this.dbConnection = connection;
  }

  async readDocument(tableName: string, query: object) {
    if (!this.dbConnection) {
      await this.setupConnection();
    }
    const collection = this.dbConnection!.collection(tableName);
    return collection.find(query).toArray();
  }

  async insertDocument(tableName: string, document: object) {
    if (!this.dbConnection) {
      await this.setupConnection();
    }
    const collection = this.dbConnection!.collection(tableName);
    return collection.insertOne(document);
  }
}
