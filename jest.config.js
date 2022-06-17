module.exports = {
    globalSetup: './test/jest-global-setup.ts',
    globalTeardown: './test/jest-global-teardown.ts',
    moduleFileExtensions: ['js', 'ts'],
    moduleNameMapper: {
        '^#/(.+)': '<rootDir>/src/$1',
        '^@common/(.+)': '<rootDir>/src/common/$1',
        '^@config': '<rootDir>/src/config/app.config',
        '^@domain/(.+)': '<rootDir>/src/modules/domain/$1',
        '^@modules/(.+)': '<rootDir>/src/modules/$1',
        '^@gogh-graphql/(.+)': '<rootDir>/src/gogh/graphql/$1',
        '^@gogh-mailer/(.+)': '<rootDir>/src/gogh/mailer/$1',
        '^@gogh-modules/(.+)': '<rootDir>/src/gogh/modules/$1',
    },
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
        },
    },
    testMatch: ['**/test/**/*.spec.ts'],
    notify: true,
    setupFiles: ['./test/setup.ts'],
}