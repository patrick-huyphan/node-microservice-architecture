import request from "supertest";
import { v4 as uuid } from "uuid";
import { server } from "../../test.functions";
import { deleteTodoController } from "./delete-todo.controller";

jest.mock("./todo.dao");

describe("deleteTodoController", () => {
  const route = "/todos/:id";

  const app = server((app) => {
    app.delete(route, deleteTodoController);
  });

  it("deletes the todo and returns a 204", async () => {
    const deleteTodo = require("./todo.dao").deleteTodo;
    const todoId = uuid();
    deleteTodo.mockResolvedValue();
    await request(app).delete(route.replace(":id", todoId)).expect(204);
    expect(deleteTodo).toHaveBeenCalledWith(todoId);
  });
});
