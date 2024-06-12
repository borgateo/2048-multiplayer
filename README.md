# 2048 Game - Multiplayer mode - Turborepo 

> [!IMPORTANT]  
> This is a work in progress. The game is not yet ready for production use.



### Apps and Packages

- `api`: a WS server
- `ui`: a [Vite](https://vitejs.dev/) single page app with the ui of the game
- `@repo/eslint-config`: ESLint configurations used throughout the monorepo
- `@repo/logger`: isomorphic logger (a small wrapper around console.log)
- `@repo/typescript-config`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
