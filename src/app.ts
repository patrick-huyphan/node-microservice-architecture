import express from "express";
import { healthController } from "./controllers/health.controller";
import { todoRoute } from "./controllers/todos/todo.router";
import { sendErrorResponse } from "./error-handling/error-handler";
import { logRequest } from "./pre-request-handlers/log-request";
import { serveOpenapiSpec } from "./pre-request-handlers/openapi";

const app = express();

app.use(logRequest(true));
app.use(express.json({ limit: "1mb" }));
app.use("/openapi.json", serveOpenapiSpec);
app.use("/health", healthController);

app.use("/todos", todoRoute);

app.use(sendErrorResponse);

export default app;
