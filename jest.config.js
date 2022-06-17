module.exports = {
    globalSetup: './test/jest-global-setup.ts',
    globalTeardown: './test/jest-global-teardown.ts',
    moduleFileExtensions: ['js', 'ts'],
    moduleNameMapper: {
        '^#/(.+)': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    testMatch: ['./**/test/**/*.spec.ts'],
    notify: true,
    setupFiles: ['./test/setup.ts'],
}