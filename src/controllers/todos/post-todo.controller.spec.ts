import { omit } from "lodash/fp";
import request from "supertest";
import { v4 as uuid } from "uuid";
import { server } from "../../test.functions";
import { postTodoController } from "./post-todo.controller";
import { createStubTodo } from "./todo.stub";
import { Todo } from "./todo.type";

jest.mock("./todo.dao");

describe("postTodoController", () => {
  const route = "/todos";

  const app = server((app) => {
    app.post(route, postTodoController);
  });

  it("creates a todo and returns it with an id", async () => {
    const createTodo = require("./todo.dao").createTodo;
    const todo = omit("id", createStubTodo());
    const createdTodo: Todo = {
      ...todo,
      id: uuid(),
    };
    createTodo.mockResolvedValue(createdTodo);
    const response = await request(app).post(route).send(todo).expect(200);
    expect(response).toHaveProperty("body", createdTodo);
    expect(createTodo).toHaveBeenCalledWith(todo);
  });

  it("rejects an invalid request body", async () => {
    const createTodo = require("./todo.dao").createTodo;
    const todoId = uuid();
    createTodo.mockResolvedValue();
    const response = await request(app)
      .post(route.replace(":id", todoId))
      .send({})
      .expect(400);
    expect(response).toHaveProperty(
      "body.message",
      "request.body should have required property 'name', request.body should have required property 'assignee', request.body should have required property 'dueDate'"
    );
    expect(createTodo).not.toHaveBeenCalled();
  });
});
