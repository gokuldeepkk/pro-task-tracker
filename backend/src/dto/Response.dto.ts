export interface Response<T> {
  status: ResponseStatus;
  message?: string;
  data?: T;
  statusCode: number;
}

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}
