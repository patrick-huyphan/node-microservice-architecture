import request from "supertest";
import { server } from "../../test.functions";
import { putTodoController } from "./put-todo.controller";
import { createStubTodo } from "./todo.stub";
import { v4 as uuid } from "uuid";

jest.mock("./todo.dao");

describe("putTodoController", () => {
  const route = "/todos/:id";

  const app = server((app) => {
    app.put(route, putTodoController);
  });

  it("updates a todo", async () => {
    const updateTodo = require("./todo.dao").updateTodo;
    const todo = createStubTodo();
    updateTodo.mockResolvedValue(todo);
    const response = await request(app)
      .put(route.replace(":id", todo.id))
      .send(todo)
      .expect(200);
    expect(response).toHaveProperty("body", todo);
    expect(updateTodo).toHaveBeenCalledWith(todo.id, todo);
  });

  it("returns a 404 if a todo with the id does not exist", async () => {
    const updateTodo = require("./todo.dao").updateTodo;
    const otherTodoId = uuid();
    const todo = createStubTodo();
    updateTodo.mockResolvedValue("NotFound");
    await request(app)
      .put(route.replace(":id", otherTodoId))
      .send(todo)
      .expect(404);
    expect(updateTodo).toHaveBeenCalledWith(otherTodoId, todo);
  });
});
