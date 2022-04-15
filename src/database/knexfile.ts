import { Knex } from "knex";
import { config } from "../configuration/config";

module.exports = {
  client: "pg",
  connection: config.database,
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
} as Knex.Config;
