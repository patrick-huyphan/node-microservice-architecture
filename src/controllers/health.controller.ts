import { NextFunction, Request, Response } from "express";
import { db } from "../database/db";

export async function healthController(
  _request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  try {
    await db.from("information_schema.tables").select();
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
