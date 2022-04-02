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
  };
}
