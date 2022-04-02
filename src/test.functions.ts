import express, { Express, NextFunction, Request, Response } from "express";
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

export function mockControllerInputs(request: Partial<Request> = {}): {
  request: Request;
  response: Response;
  next: NextFunction;
} {
  return {
    request: {
      log: {
        error: jest.fn().mockImplementation(),
      },
      params: {},
      ...request,
    } as unknown as Request,
    response: {
      locals: {},
      status: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
      send: jest.fn(),
      end: jest.fn().mockReturnThis(),
    } as unknown as Response,
    next: jest.fn() as NextFunction,
  };
}
