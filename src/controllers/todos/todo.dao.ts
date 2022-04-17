import { v4 as uuid } from "uuid";
import { db } from "../../database/db";
import { Todo, TodoId } from "./todo.type";

export function getTodo(id: TodoId): Promise<Todo | undefined> {
  return db.table<Todo>("todos").where("id", id).first<Todo>();
}

export function getTodos(): Promise<Todo[]> {
  return db.table<Todo>("todos").select("*");
}

export async function createTodo(todo: Todo): Promise<Todo> {
  const todoWithId = {
    ...todo,
    id: uuid(),
  };
  await db.table<Todo>("todos").insert(todoWithId);
  return todoWithId;
}

export async function updateTodo(
  id: TodoId,
  todo: Todo
): Promise<Todo | "NotFound"> {
  const todoWithId = {
    ...todo,
    id,
  };
  const changedRowCount = await db
    .table<Todo>("todos")
    .where("id", id)
    .update(todoWithId);
  return changedRowCount === 0 ? "NotFound" : todoWithId;
}

export async function deleteTodo(id: TodoId): Promise<"Ok" | "NotFound"> {
  const deletedRowCount = await db
    .table<Todo>("todos")
    .where("id", id)
    .delete();
  return deletedRowCount === 0 ? "NotFound" : "Ok";
}
