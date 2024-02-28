/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
  },
  "watchPathIgnorePatterns": [
      "node_modules",
      "dist",
  ],
  "moduleDirectories": [
      "node_modules",
      "src",
  ],
  "transform": {
      "^.+\\.(ts)$": 'ts-jest',
  },
  "testMatch": [
      "**/tests/**/*.test.(ts|js)"
  ],
};