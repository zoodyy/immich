const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  clearMocks: true,
  moduleNameMapper: {
    '^@app/database(|/.*)$': '<rootDir>/server/libs/database/src/$1',
    '@app/database/config/(.*)': '<rootDir>/server/libs/database/src/config/$1',
    '@app/database/config': '<rootDir>/server/libs/database/src/config',
  },
};
