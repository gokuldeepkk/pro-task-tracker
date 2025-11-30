import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import * as Express from "express";

@Middleware({ type: "after" })
export class ResponseHandlerMiddleware implements ExpressMiddlewareInterface {
  use(
    request: Express.Request,
    response: Express.Response,
    next?: (err?: any) => any
  ): any {
    const originalJson = response.json;
    response.json = function (body?: any): Express.Response {
      console.log("Response body before middleware:", body);
      if (body && typeof body === "object" && "statusCode" in body) {
        response.status(body.statusCode);
      }
      return originalJson.call(this, body);
    };
    return;
  }
}
