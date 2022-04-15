import { Config, ProcessVariables } from "../config.type";

export function getProductionConfig(
  processVariables: ProcessVariables
): Config {
  return {
    environment: "production",
    logLevel: processVariables.LOG_LEVEL ?? "info",
    authentication: {
      enabled: true,
      jwksUrl:
        processVariables.JWKS_URL ??
        "<JWKS_URL> needs to be set in production environment",
    },
    database: {
      user: processVariables.POSTGRES_USER,
      host: processVariables.POSTGRES_HOST,
      database: processVariables.POSTGRES_DB,
      port: processVariables.POSTGRES_PORT
        ? parseInt(processVariables.POSTGRES_PORT)
        : undefined,
      password: processVariables.POSTGRES_PASSWORD,
      ssl: true,
    },
  };
}
