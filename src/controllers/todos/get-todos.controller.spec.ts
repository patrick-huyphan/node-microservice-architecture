import request from "supertest";
import { server } from "../../test.functions";
import { getTodosController } from "./get-todos.controller";
import { createStubTodo } from "./todo.stub";

jest.mock("./todo.dao");

describe("getTodosController", () => {
  const route = "/todos";

  const app = server((app) => {
    app.get(route, getTodosController);
  });

  it("returns the list of existing todos", async () => {
    const getTodos = require("./todo.dao").getTodos;
    const todos = [createStubTodo(), createStubTodo()];
    getTodos.mockResolvedValue(todos);
    const response = await request(app).get(route).expect(200);
    expect(response).toHaveProperty("body", todos);
    expect(getTodos).toHaveBeenCalledWith();
  });
});
