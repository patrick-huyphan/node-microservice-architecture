import request from "supertest";
import { v4 as uuid } from "uuid";
import { server } from "../../test.functions";
import { getTodoController } from "./get-todo.controller";
import { createStubTodo } from "./todo.stub";

jest.mock("./todo.dao");

describe("getTodoController", () => {
  const route = "/todos/:id";

  const app = server((app) => {
    app.get(route, getTodoController);
  });

  it("returns the todo with the id", async () => {
    const getTodo = require("./todo.dao").getTodo;
    const todo = createStubTodo();
    getTodo.mockResolvedValue(todo);
    const response = await request(app)
      .get(route.replace(":id", todo.id))
      .expect(200);
    expect(response).toHaveProperty("body", todo);
    expect(getTodo).toHaveBeenCalledWith(todo.id);
  });

  it("returns a 404 if no todo with that id exists", async () => {
    const getTodo = require("./todo.dao").getTodo;
    const todoId = uuid();
    getTodo.mockResolvedValue(undefined);
    await request(app).get(route.replace(":id", todoId)).expect(404);
    expect(getTodo).toHaveBeenCalledWith(todoId);
  });
});
