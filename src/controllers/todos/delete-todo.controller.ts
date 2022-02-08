import { NextFunction, Request, Response } from "express";
import { deleteTodo } from "./todo.dao";

export async function deleteTodoController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await deleteTodo(request.params.id);
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
