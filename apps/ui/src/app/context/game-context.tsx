import { createContext, useCallback, useEffect, useReducer } from "react";
import { isNil, throttle } from "lodash";
import type { PropsWithChildren } from "react";
import { MERGE_ANIMATION_DURATION, GRID_SIZE } from "../constants";
import type { Tile } from "../components/types";
import gameReducer, {
  ActionType,
  initialState,
} from "../reducers/game-reducer";
import { randomizeTile } from "../utils/randomizeTile";
import type { MOVE_UP, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT } from "../constants";

export const GameContext = createContext({
  score: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveTiles: (_: MoveDirection) => {},
  getTiles: () => [] as Tile[],
  startGame: () => {},
  resetGame: () => {},
  isGameOver: false,
});

type MoveDirection =
  | typeof MOVE_UP
  | typeof MOVE_DOWN
  | typeof MOVE_LEFT
  | typeof MOVE_RIGHT;

export default function GameProvider({ children }: PropsWithChildren) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const getTiles = (): Tile[] => {
    return gameState.tilesByIds.map((tileId) => gameState.tiles[tileId]);
  };

  const moveTiles = useCallback(
    throttle(
      // eslint-disable-next-line
      (type: MoveDirection) => dispatch({ type }),
      MERGE_ANIMATION_DURATION * 1.05,
      { trailing: false }
    ),
    [dispatch]
  );

  const startGame = (): void => {
    const occupiedPositions = new Set<string>();
    const [firstX, firstY] = randomizeTile(0, GRID_SIZE - 1, occupiedPositions);
    occupiedPositions.add(`${firstX},${firstY}`);

    const [secondX, secondY] = randomizeTile(
      0,
      GRID_SIZE - 1,
      occupiedPositions
    );
    occupiedPositions.add(`${secondX},${secondY}`);

    // add two tiles (2) on the board in a random position
    dispatch({
      type: ActionType.CREATE_TILE,
      tile: { position: [firstX, firstY], value: 2 },
    });
    dispatch({
      type: ActionType.CREATE_TILE,
      tile: { position: [secondX, secondY], value: 2 },
    });
  };

  const resetGame = (): void => {
    dispatch({ type: ActionType.RESET_GAME });
  };
  useEffect(() => {
    const getEmptyCells = (): [number, number][] => {
      const results: [number, number][] = [];

      for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
          if (isNil(gameState.board[y][x])) {
            results.push([x, y]);
          }
        }
      }
      return results;
    };

    const isGameOver = (): boolean => {
      const emptyCells = getEmptyCells();

      if (emptyCells.length > 0) {
        return false;
      }
      // Check if there are any adjacent cells with the same value
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const currentTileId = gameState.board[y][x];
          if (!isNil(currentTileId)) {
            // Check up
            if (y > 0 && gameState.board[y - 1][x] === currentTileId) {
              return false;
            }
            // Check down
            if (
              y < GRID_SIZE - 1 &&
              gameState.board[y + 1][x] === currentTileId
            ) {
              return false;
            }
            // Check left
            if (x > 0 && gameState.board[y][x - 1] === currentTileId) {
              return false;
            }
            // Check right
            if (
              x < GRID_SIZE - 1 &&
              gameState.board[y][x + 1] === currentTileId
            ) {
              return false;
            }
          }
        }
      }
      return true; // No adjacent cells with the same value found
    };

    const appendRandomTile = (): void => {
      console.log("appendRandomTile");
      const emptyCells = getEmptyCells();
      if (emptyCells.length > 0) {
        const cellIndex = Math.floor(Math.random() * emptyCells.length);
        const newTile = {
          position: emptyCells[cellIndex],
          value: 2,
        };
        dispatch({ type: ActionType.CREATE_TILE, tile: newTile });
      }
    };

    if (gameState.hasChanged) {
      setTimeout(() => {
        dispatch({ type: ActionType.CLEAN_UP });
        appendRandomTile();
      }, MERGE_ANIMATION_DURATION);
    } else if (isGameOver()) {
      dispatch({ type: ActionType.SHOW_GAME_OVER });
    }
  }, [gameState.hasChanged, gameState.board]);

  return (
    <GameContext.Provider
      value={{
        score: gameState.score,
        getTiles,
        moveTiles,
        startGame,
        resetGame,
        isGameOver: gameState.isGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
