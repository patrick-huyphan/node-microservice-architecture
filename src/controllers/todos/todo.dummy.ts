import { v4 as uuid } from "uuid";
import { Todo } from "./todo.type";

export const createDummyTodo = (): Todo => ({
  id: uuid(),
  name: "Name",
  assignee: "Assignee",
  dueDate: new Date().toISOString(),
});
