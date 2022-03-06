import expressPino from "express-pino-logger";

export const logRequest = (enabled: boolean) =>
  expressPino({
    level: "info",
    enabled,
  });
