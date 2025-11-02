export interface Response<T> {
  status: ResponseStatus;
  message?: string;
  data?: T;
  code: number;
}

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}
