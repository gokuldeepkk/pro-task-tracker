import "reflect-metadata"; // Must be imported once in your application entry point

import { createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { DatabaseService } from "./services/common/databaseService";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

// --- Configuration Constants ---
const PORT = 3000;

async function bootstrap() {
  console.log("🔧 Setting up dependency injection container");
  (createExpressServer as any).container = Container;
  console.log("⏳ Attempting to connect to MongoDB...");
  try {
    const dbService = Container.get<DatabaseService>(DatabaseService);
    await dbService.getConnection();
    console.log("✅ Connected to MongoDB successfully");
  } catch (error) {
    console.error("❌ Could not connect to MongoDB:", error);
    process.exit(1);
  }

  console.log("✅ Creating Express server with routing-controllers");
  const app = createExpressServer({
    controllers: [__dirname + "/controllers/*.ts"],
    defaultErrorHandler: false,
    classTransformer: true,
    validation: true,
  });

  app.listen(PORT, () => {
    console.log(`🚀 App is running on http://localhost:${PORT}`);
  });
}

// Execute the setup function
bootstrap();
