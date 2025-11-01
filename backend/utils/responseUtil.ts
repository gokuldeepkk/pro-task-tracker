import { Response, ResponseStatus } from "../models/Response";
import { Service } from "typedi";

@Service()
export class ResponseUtil {
  public success(data: any, code: number = 200): Response<any> {
    return {
      status: ResponseStatus.SUCCESS,
      data,
      code,
    };
  }

  public error(error: any, code: number = 500): Response<any> {
    const errorObject = {
      status: ResponseStatus.ERROR,
      message: "Internal Server Error",
      code,
    };
    if (error instanceof Error) {
      errorObject.message = error.message;
    }

    if (typeof error === "string") {
      errorObject.message = error;
    }

    return errorObject;
  }
}
