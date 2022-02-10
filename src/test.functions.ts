import express, { Express } from "express";
import { validateInputs } from "./pre-request-handlers/openapi";

export function server(configure: (express: Express) => void): Express {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  app.use(validateInputs);
  configure(app);
  return app;
}
