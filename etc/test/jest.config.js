module.exports = {
    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Sets the path that later can be referenced as a <rootDir> token
    rootDir: '../../',

    // A list of paths to directories that Jest should use to search for files in
    roots: [
        '<rootDir>/__tests__',
        '<rootDir>/src',
    ],

    // The glob patterns Jest uses to detect test files.
    testMatch: [
        '<rootDir>/**/__tests__/**/*.spec.ts?(x)',
    ],

    // Indicates whether the coverage information should be collected while executing the test.
    // Because this retrofits all executed files with coverage collection statements,
    // it may significantly slow down your tests.
    collectCoverage: true,

    // An array of glob patterns indicating a set of files for which coverage information
    // should be collected. If a file matches the specified glob pattern, coverage
    // information will be collected for it even if no tests exist for this file
    // and it's never required in the test suite.
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts',
        '!<rootDir>/src/**/__tests__/**/*.ts?(x)',
        '!<rootDir>/src/**/BemMagicExplained/**/*.ts',
    ],

    // This will be used to configure minimum threshold enforcement for coverage results.
    // Thresholds can be specified as global, as a glob, and as a directory or file path.
    // If thresholds aren't met, jest will fail.
    // Thresholds specified as a positive number are taken to be the minimum percentage required.
    // Thresholds specified as a negative number represent the maximum number of uncovered entities
    // allowed.
    coverageThreshold: {
        global: {
            branches: 95,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },

    // A map from regular expressions to paths to transformers.
    // A transformer is a module that provides a synchronous function for transforming source files.
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
};
