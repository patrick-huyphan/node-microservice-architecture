import { v4 as uuid } from "uuid";
import { Todo } from "./todo.type";

export const createStubTodo = (): Todo => ({
  id: uuid(),
  name: "Name",
  assignee: "Assignee",
  dueDate: "2022-02-05",
});
