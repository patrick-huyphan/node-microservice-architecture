import express from "express";
import { todoRoute } from "./controllers/todos/todo.router";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use("/todos", todoRoute);

export default app;
