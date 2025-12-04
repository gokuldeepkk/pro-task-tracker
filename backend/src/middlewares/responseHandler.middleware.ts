import { Middleware, ExpressMiddlewareInterface } from "routing-controllers";
import * as Express from "express";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class ResponseHandlerMiddleware implements ExpressMiddlewareInterface {
  use(
    request: Express.Request,
    response: Express.Response,
    next?: (err?: any) => any
  ): any {
    console.log(`[MIDDLEWARE] ${request.method} ${request.path}`);
    console.log(`[MIDDLEWARE] Readable: ${request.readable}`);
    // const originalJson = response.json;
    // response.json = function (body?: any): Express.Response {
    //   console.log("Response body before middleware:", body);
    //   if (body && typeof body === "object" && "statusCode" in body) {
    //     response.status(body.statusCode);
    //   }
    //   return originalJson.call(this, body);
    // };
    // return;
    if (next) next();
    return;
  }
}
