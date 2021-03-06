import { Knex } from "knex";
import { Level } from "pino";

export type Environment =
  // The service running in a production cluster available for customers
  | "production"
  // The service running locally on a development machine
  | "local";

export interface Config {
  environment: Environment;
  logLevel: Level;
  authentication: {
    enabled: boolean;
    jwksUrl: string;
  };
  database: Knex.PgConnectionConfig;
}

export interface ProcessVariables {
  ENV?: Environment;
  LOG_LEVEL?: Level;
  JWKS_URL?: string;
  DATABASE_URL?: string;
}
