import expressPino from "express-pino-logger";
import { config } from "../configuration/config";

export const logRequest = (enabled: boolean) =>
  expressPino({
    level: config.logLevel,
    enabled,
    serializers: {
      req: (request) => ({
        method: request.method,
        url: request.url,
      }),
    },
  });
