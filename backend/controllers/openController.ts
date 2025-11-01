import { Controller, Get, Header } from "routing-controllers";

@Controller()
export class OpenController {
  @Get("/")
  @Header("Content-Type", "text/html")
  entryEndpoint() {
    return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>HTML Response</title>
                <style>
                    body { font-family: sans-serif; background-color: #f0f0f0; }
                    .container { margin: 50px; padding: 20px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Hello from pro-task manager</h1>
                    <p>This will serve as the entry point for the API.</p>
                </div>
            </body>
            </html>
        `;
  }

  @Get("/health")
  healthCheck() {
    return { status: "OK", timestamp: new Date().toISOString() };
  }
}
