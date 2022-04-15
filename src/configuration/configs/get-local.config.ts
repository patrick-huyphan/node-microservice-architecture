import { Config, ProcessVariables } from "../config.type";

export function getLocalConfig(processVariables: ProcessVariables): Config {
  return {
    environment: "local",
    logLevel: processVariables.LOG_LEVEL ?? "debug",
    authentication: {
      enabled: false,
      jwksUrl: "",
    },
    database: {
      user: "postgres",
      host: "localhost",
      database: "postgres",
      port: 5432,
      password: "secret",
      ssl: false
    },
  };
}
