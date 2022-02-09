import request from "supertest";
import { server } from "../../test.functions";
import { putTodoController } from "./put-todo.controller";
import { createDummyTodo } from "./todo.dummy";

jest.mock("./todo.dao");

describe("putTodoController", () => {
  const route = "/todos/:id";

  const app = server((app) => {
    app.put(route, putTodoController);
  });

  it("updates a todo", async () => {
    const updateTodo = require("./todo.dao").updateTodo;
    const todo = createDummyTodo();
    updateTodo.mockResolvedValue(todo);
    const response = await request(app)
      .put(route.replace(":id", todo.id))
      .send(todo)
      .expect(200);
    expect(response).toHaveProperty("body", todo);
    expect(updateTodo).toHaveBeenCalledWith(todo.id, todo);
  });
});
