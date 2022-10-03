import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    setupFilesAfterEnv: ['./test/setup.ts'],
    //testTimeout: 10000,
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    modulePathIgnorePatterns: ['./dist/', './test/mocks.ts'],
    coveragePathIgnorePatterns: ['./test/mocks.ts'],
};

export default config;
