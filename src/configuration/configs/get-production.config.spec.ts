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
        DATABASE_URL: "postgres://username:password@host:port/database_name",
      })
    ).toHaveProperty("database", {
      connectionString: "postgres://username:password@host:port/database_name",
    } as Knex.PgConnectionConfig);
  });
});
