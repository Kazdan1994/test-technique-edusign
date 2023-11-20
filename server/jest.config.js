module.exports = {
  moduleFileExtensions: ["ts", "js"],
  transform: { "^.+\\.(ts|tsx)$": ["ts-jest", { tsconfig: "tsconfig.json" }] },
  testMatch: ["**/test/**/*.test.(ts|js)"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts}",
    "!<rootDir>/node_modules/",
    "!<rootDir>/types/",
  ],
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]
};
