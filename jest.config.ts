import type { Config } from 'jest';
// jest.config.js
//import { pathsToModuleNameMapper } from 'ts-jest';
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
//import { compilerOptions } from './tsconfig.json';

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
    //moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
