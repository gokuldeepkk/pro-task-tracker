import { Service } from "typedi";
import { Logger, createLogger, transports, format } from "winston";

@Service()
export class LoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.errors({ stack: true }), // Include stack trace on error
        format.splat(), // Enable string interpolation
        format.json() // Output logs as JSON
      ),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
          level: "debug",
        }),
      ],
    });
    console.log("✅ Logger service initialized.");
  }

  public info(message: string, ...meta: any[]): void {
    this.logger.info(message, ...meta);
  }

  public error(message: string, ...meta: any[]): void {
    this.logger.error(message, ...meta);
  }

  public debug(message: string, ...meta: any[]): void {
    this.logger.debug(message, ...meta);
  }
}
