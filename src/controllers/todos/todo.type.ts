export type TodoId = string;

export type TodoMap = Record<TodoId, Todo>;

export interface Todo {
  id: TodoId;
  name: string;
  assignee: string;
  dueDate: string;
}
