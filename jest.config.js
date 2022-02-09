process.env = Object.assign(process.env, {
  DISABLE_LOGGER: "true",
});

module.exports = {
  verbose: true,
  moduleFileExtensions: ["ts", "js"],
  rootDir: ".",
  preset: "ts-jest",
  testRegex: "\\.spec\\.ts$",
  testEnvironment: "node",
  forceExit: true,
  resetMocks: true,
};
