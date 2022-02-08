import express from "express";
import { deleteTodoController } from "./delete-todo.controller";
import { getTodoController } from "./get-todo.controller";
import { getTodosController } from "./get-todos.controller";
import { postTodoController } from "./post-todo.controller";
import { putTodoController } from "./put-todo.controller";

export const todoRoute = express.Router({ mergeParams: true });

todoRoute.get("/:id", getTodoController);
todoRoute.get("", getTodosController);
todoRoute.put("/:id", putTodoController);
todoRoute.delete("/:id", deleteTodoController);
todoRoute.post("", postTodoController);
