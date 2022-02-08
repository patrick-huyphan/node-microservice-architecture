import { NextFunction, Request, Response } from "express";
import { updateTodo } from "./todo.dao";
import { Todo, TodoId } from "./todo.type";

export async function putTodoController(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const updatedTodo = await updateTodo(
      request.params.id as TodoId,
      request.body as Todo
    );
    response.send(updatedTodo);
  } catch (error) {
    next(error);
  }
}
