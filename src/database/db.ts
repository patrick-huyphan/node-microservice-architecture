import { Knex } from "knex";
import { config } from "../configuration/config";

export const db = require("knex")({
  client: "pg",
  connection: config.database,
}) as Knex;
