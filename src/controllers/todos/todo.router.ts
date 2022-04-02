import express from "express";
import { authenticate } from "../../pre-request-handlers/authenticate";
import { validateInputs } from "../../pre-request-handlers/openapi";
import { deleteTodoController } from "./delete-todo.controller";
import { getTodoController } from "./get-todo.controller";
import { getTodosController } from "./get-todos.controller";
import { postTodoController } from "./post-todo.controller";
import { putTodoController } from "./put-todo.controller";

export const todoRoute = express.Router({ mergeParams: true });

todoRoute.use(authenticate);
todoRoute.use(validateInputs);

todoRoute.get("/:id", getTodoController);
todoRoute.get("", getTodosController);
todoRoute.put("/:id", putTodoController);
todoRoute.delete("/:id", deleteTodoController);
todoRoute.post("", postTodoController);
