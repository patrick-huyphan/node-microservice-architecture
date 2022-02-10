import express from "express";
import { todoRoute } from "./controllers/todos/todo.router";
import { sendErrorResponse } from "./error-handling/error-handler";
import { serveOpenapiSpec } from "./pre-request-handlers/openapi";

const app = express();

app.use(express.json({ limit: "1mb" }));
app.use("/openapi.json", serveOpenapiSpec);

app.use("/todos", todoRoute);

app.use(sendErrorResponse);

export default app;
