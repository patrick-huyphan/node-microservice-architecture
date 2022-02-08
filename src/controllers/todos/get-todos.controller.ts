import { NextFunction, Request, Response } from "express";
import { getTodos } from "./todo.dao";

export async function getTodosController(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const todos = await getTodos();
    response.send(todos);
  } catch (error) {
    next(error);
  }
}
