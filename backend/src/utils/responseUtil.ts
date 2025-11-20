import { Response, ResponseStatus } from "../dto/Response.dto";
import { Service } from "typedi";

@Service()
export class ResponseUtil {
  public success(data: any, code: number = 200): Response<any> {
    return {
      status: ResponseStatus.SUCCESS,
      data,
      statusCode: code,
    };
  }

  public error(error: any, code: number = 500): Response<any> {
    const errorObject = {
      status: ResponseStatus.ERROR,
      message: "Internal Server Error",
      statusCode: code,
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
