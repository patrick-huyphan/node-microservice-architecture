import { v4 as uuid } from "uuid";
import { todos } from "./todo.storage";
import { Todo, TodoId } from "./todo.type";

export async function getTodo(id: TodoId): Promise<Todo | undefined> {
  return todos[id];
}

export async function getTodos(): Promise<Todo[]> {
  return Object.values(todos);
}

export async function createTodo(todo: Todo): Promise<Todo> {
  const id = uuid();
  const createdTodo = {
    ...todo,
    id,
  };
  todos[id] = createdTodo;
  return createdTodo;
}

export async function updateTodo(
  id: TodoId,
  todo: Todo
): Promise<Todo | "NotFound"> {
  if (!(id in todo)) {
    return "NotFound";
  }
  const updatedTodo = {
    ...todo,
    id,
  };
  todos[id] = updatedTodo;
  return updatedTodo;
}

export async function deleteTodo(id: TodoId): Promise<void> {
  delete todos[id];
}
