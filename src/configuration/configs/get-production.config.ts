import { Config, ProcessVariables } from "../config.type";

export function getProductionConfig(
  processVariables: ProcessVariables
): Config {
  return {
    environment: "production",
    logLevel: processVariables.LOG_LEVEL ?? "info",
  };
}
