import { NextFunction, Request, Response } from "express";
import { getTodo } from "./todo.dao";

export async function getTodoController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const todo = await getTodo(request.params.id);
    if (todo) {
      response.send(todo);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
}
