import { getConfig } from "./get-config";

jest.mock("./get-local.config", () => ({
  getLocalConfig: () => ({ environment: "local" }),
}));
jest.mock("./get-production.config", () => ({
  getProductionConfig: () => ({ environment: "production" }),
}));

describe("the configuration", () => {
  it("defaults to the local environment", () => {
    expect(getConfig({})).toHaveProperty("environment", "local");
  });

  it("returns the local config for a local environment", () => {
    expect(getConfig({ ENV: "local" })).toHaveProperty("environment", "local");
  });

  it("returns the production config for a production environment", () => {
    expect(getConfig({ ENV: "production" })).toHaveProperty(
      "environment",
      "production"
    );
  });
});
