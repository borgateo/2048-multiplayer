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

### Idea

- Game Lobby: Players connect to a lobby where they can see a list of available games or create a new game.
- Creating/Joining a Game: A player can either create a new game or join an existing game in the lobby. When creating a game, the player may choose options such as the board size or game mode.
- Game Start: Once the game has the required number of players, it starts. Each player sees the same board and starts with an initial set of tiles (e.g., two tiles with the value 2).
- Turn-Based Play: Players take turns making moves. A player can swipe in one of the four directions (up, down, left, right) to move the tiles on the board.
- Syncing Game State: After each move, the player's action is sent to the server, which updates the game state. The server then broadcasts the updated game state to all players in the game.
- Game Over: The game continues until no more moves are possible (i.e., the board is full and no adjacent tiles have the same value). At this point, the player with the highest score wins- 
- Win/Lose Conditions: Depending on the game mode, the player with the highest score may win, or there may be other win/lose conditions:
  - timeout mode: reaching a certain score threshold before the other players (1, 2, or 3 minutes?)
  - collaboration mode: players (2 or more?) are connected to the same game instance and see the same board with the same tiles. Turn-based system where each player takes turns to move a tile. 
- Game Reset: After a game ends, players can choose to play again or return to the lobby to join or create a new game.
