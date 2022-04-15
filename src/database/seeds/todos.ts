import { Knex } from "knex";
import { Todo } from "../../controllers/todos/todo.type";

const todos: Todo[] = [
  {
    id: "142e8446-f5ba-4813-bfb5-f3192a37f1bf",
    name: "Create Todo",
    assignee: "Naomi",
    dueDate: "2025-01-05",
  },
  {
    id: "bf6091cc-69f8-4a9e-93ed-0294c3a8ac2f",
    name: "Delete Todo",
    assignee: "Peter",
    dueDate: "2029-06-11",
  },
  {
    id: "6e5bad4c-7f1c-4ab4-9361-c6bd697b4257",
    name: "Change Todo",
    assignee: "Sheila",
    dueDate: "2032-11-27",
  },
];

export async function seed(knex: Knex): Promise<void> {
  await knex("todos").truncate();
  await knex("todos").insert(todos);
}
