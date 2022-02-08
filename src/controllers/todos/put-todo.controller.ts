import { NextFunction, Request, Response } from "express";
import { updateTodo } from "./todo.dao";

export async function putTodoController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updatedTodo = await updateTodo(request.params.id, request.body);
    response.send(updatedTodo);
  } catch (error) {
    next(error);
  }
}
