import express, { Express } from "express";

export function server(configure: (express: Express) => void): Express {
  const app = express();
  app.use(express.json({ limit: "1mb" }));
  configure(app);
  return app;
}
