import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, req: any, res: any, next: (err?: any) => any): void {
    const status = error.httpCode || error.statusCode || 500;

    // 2. Determine Message (Avoid exposing internal details for 500 errors)
    let message = error.message;

    if (status === 500 && process.env.NODE_ENV === "production") {
      message = "Internal Server Error";
    }

    // Optional: Log the full error stack for debugging purposes
    console.error(`[HTTP Error ${status}] Path: ${req.path}`);
    if (status === 500) {
      console.error(error.stack);
    }

    // 3. Send Structured JSON Response
    res.status(status).json({
      message: message,
      errors: error.errors || undefined,
    });
  }
}
