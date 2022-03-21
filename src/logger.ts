import pino from "pino";
import { config } from "./configuration/config";

export const logger = pino({
  level: config.logLevel,
});
