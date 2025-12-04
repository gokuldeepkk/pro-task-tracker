import "reflect-metadata"; // Must be imported once in your application entry point

import { useContainer, useExpressServer } from "routing-controllers";
import * as express from "express";
import { Container } from "typedi";
import { DatabaseService } from "src/services/common/databaseService";
import * as dotenv from "dotenv";
import * as path from "path";
import { API_VERSION } from "src/utils/constants/routes";

dotenv.config({ path: path.resolve(__dirname, ".env") });

// --- Configuration Constants ---
const PORT = 3000;

async function initializeDatabase() {
  try {
    console.log("⏳ Attempting to connect to MongoDB...");
    const dbService = Container.get<DatabaseService>(DatabaseService);
    await dbService.getConnection();
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error);
    process.exit(1);
  }
}

async function bootstrap() {
  await initializeDatabase();
  console.log("✅ Creating Express server with routing-controllers");
  const app = express();
  app.use(express.json());
  useContainer(Container);
  useExpressServer(app, {
    controllers: [__dirname + "/src/controllers/*.ts"],
    middlewares: [__dirname + "/src/middlewares/*.ts"],
    defaultErrorHandler: false,
    classTransformer: true,
    validation: true,
    routePrefix: API_VERSION,
  } as any);

  app.listen(PORT, () => {
    console.log(`🚀 App is running on http://localhost:${PORT}`);
  });
}

// Execute the setup function
bootstrap();
