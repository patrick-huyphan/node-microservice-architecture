import { NextFunction, Request, Response } from "express";
import { createTodo } from "./todo.dao";

export async function postTodoController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const todo = await createTodo(request.body);
    response.send(todo);
  } catch (error) {
    next(error);
  }
}
