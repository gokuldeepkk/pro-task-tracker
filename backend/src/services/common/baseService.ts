import Container from "typedi";
import { LoggerService } from "./loggerService";
import { ResponseUtil } from "../../utils/responseUtil";

export class BaseService {
  protected readonly logger: LoggerService;
  protected readonly response: ResponseUtil;
  constructor() {
    this.logger = Container.get<LoggerService>(LoggerService);
    this.response = Container.get<ResponseUtil>(ResponseUtil);
  }
}
