import express from "express";
import { todosRoute } from "./controllers/todos/todos.router";

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use("/todos", todosRoute);

export default app;
