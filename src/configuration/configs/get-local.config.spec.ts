import { getLocalConfig } from "./get-local.config";

describe("the local configuration", () => {
  it("prefers the log level from the environment", () => {
    expect(getLocalConfig({ LOG_LEVEL: "fatal" })).toHaveProperty(
      "logLevel",
      "fatal"
    );
  });

  it("defaults the log level to debug", () => {
    expect(getLocalConfig({})).toHaveProperty("logLevel", "debug");
  });
});
