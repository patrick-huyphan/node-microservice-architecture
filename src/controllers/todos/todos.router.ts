import express from "express";
import { deleteTodoController } from "./delete-todo.controller";
import { getTodoController } from "./get-todo.controller";
import { getTodosController } from "./get-todos.controller";
import { postTodoController } from "./post-todo.controller";
import { putTodoController } from "./put-todo.controller";

export const todosRoute = express.Router({ mergeParams: true });

todosRoute.get("/:id", getTodoController);
todosRoute.get("", getTodosController);
todosRoute.put("/:id", putTodoController);
todosRoute.delete("/:id", deleteTodoController);
todosRoute.post("", postTodoController);
