import { Knex } from "knex";
import { getProductionConfig } from "./get-production.config";

describe("the production configuration", () => {
  it("prefers the log level from the environment", () => {
    expect(getProductionConfig({ LOG_LEVEL: "fatal" })).toHaveProperty(
      "logLevel",
      "fatal"
    );
  });

  it("defaults the log level to info", () => {
    expect(getProductionConfig({})).toHaveProperty("logLevel", "info");
  });

  it("reads the database configuration from the environment", () => {
    expect(
      getProductionConfig({
        POSTGRES_USER: "postgres",
        POSTGRES_DB: "postgres",
        POSTGRES_PASSWORD: "secret",
        POSTGRES_HOST: "localhost",
        POSTGRES_PORT: "5432",
      })
    ).toHaveProperty("database", {
      user: "postgres",
      database: "postgres",
      password: "secret",
      host: "localhost",
      port: 5432,
      ssl: true,
    } as Knex.PgConnectionConfig);
  });
});
