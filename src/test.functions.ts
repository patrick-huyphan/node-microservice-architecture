import express, { Express } from "express";
import { sendErrorResponse } from "./error-handling/error-handler";
import { logRequest } from "./pre-request-handlers/log-request";
import { validateInputs } from "./pre-request-handlers/openapi";

export function server(configure: (express: Express) => void): Express {
  const app = express();
  app.use(logRequest(false));
  app.use(express.json({ limit: "1mb" }));
  app.use(validateInputs);
  configure(app);
  app.use(sendErrorResponse);
  return app;
}
