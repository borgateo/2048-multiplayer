import { flattenDeep, isEqual, isNil } from "lodash";
import { uid } from "uid";
import { GRID_SIZE } from "../constants";
import type { Tile, TileMap } from "../components/types";
import type {
  CREATE_TILE,
  CLEAN_UP,
  RESET_GAME,
  MOVE_UP,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  SHOW_GAME_OVER,
} from "../constants";
import { i } from "vitest/dist/reporters-yx5ZTtEV.js";

interface StateGame {
  board: string[][];
  tiles: TileMap;
  tilesByIds: string[];
  hasChanged: boolean;
  score: number;
  isGameOver: boolean;
}

export enum ActionType {
  CREATE_TILE = "create_tile",
  CLEAN_UP = "clean_up",
  RESET_GAME = "reset_game",
  MOVE_UP = "move_up",
  MOVE_DOWN = "move_down",
  MOVE_LEFT = "move_left",
  MOVE_RIGHT = "move_right",
  SHOW_GAME_OVER = "show_game_over",
}

type Action =
  | { type: typeof CREATE_TILE; tile: Tile }
  | { type: typeof CLEAN_UP }
  | { type: typeof RESET_GAME }
  | { type: typeof MOVE_UP }
  | { type: typeof MOVE_DOWN }
  | { type: typeof MOVE_LEFT }
  | { type: typeof MOVE_RIGHT }
  | { type: typeof SHOW_GAME_OVER };

function createBoard(): string[][] {
  const board: string[][] = [];

  for (let i = 0; i < GRID_SIZE; i += 1) {
    board[i] = new Array(GRID_SIZE).fill(undefined) as string[];
  }

  return board;
}

export const initialState: StateGame = {
  board: createBoard(),
  tiles: {},
  tilesByIds: [],
  hasChanged: false,
  score: 0,
  isGameOver: false,
};

export default function gameReducer(
  state: StateGame = initialState,
  action: Action
) {
  switch (action.type) {
    case ActionType.CLEAN_UP: {
      const flattenBoard = flattenDeep(state.board);
      const newTiles: TileMap = flattenBoard.reduce(
        (result, tileId: string) => {
          if (isNil(tileId)) {
            return result;
          }

          return {
            ...result,
            [tileId]: state.tiles[tileId],
          };
        },
        {}
      );

      return {
        ...state,
        tiles: newTiles,
        tilesByIds: Object.keys(newTiles),
        hasChanged: false,
      };
    }
    case ActionType.CREATE_TILE: {
      const tileId = uid();
      const [x, y] = action.tile.position;
      const newBoard = JSON.parse(JSON.stringify(state.board));
      newBoard[y][x] = tileId;

      return {
        ...state,
        board: newBoard,
        tiles: {
          ...state.tiles,
          [tileId]: {
            id: tileId,
            ...action.tile,
          },
        },
        tilesByIds: [...state.tilesByIds, tileId],
      };
    }
    case ActionType.MOVE_UP: {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let x = 0; x < GRID_SIZE; x++) {
        let newY = 0;
        let previousTile: Tile | undefined;

        for (let y = 0; y < GRID_SIZE; y++) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [x, newY - 1],
              };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[newY][x] = tileId;
            newTiles[tileId] = {
              ...currentTile,
              position: [x, newY],
            };
            previousTile = newTiles[tileId];
            if (!isEqual(currentTile.position, [x, newY])) {
              hasChanged = true;
            }
            newY++;
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case ActionType.MOVE_DOWN: {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let x = 0; x < GRID_SIZE; x++) {
        let newY = GRID_SIZE - 1;
        let previousTile: Tile | undefined;

        for (let y = GRID_SIZE - 1; y >= 0; y--) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [x, newY + 1],
              };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[newY][x] = tileId;
            newTiles[tileId] = {
              ...currentTile,
              position: [x, newY],
            };
            previousTile = newTiles[tileId];
            if (!isEqual(currentTile.position, [x, newY])) {
              hasChanged = true;
            }
            newY--;
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case ActionType.MOVE_LEFT: {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let y = 0; y < GRID_SIZE; y++) {
        let newX = 0;
        let previousTile: Tile | undefined;

        for (let x = 0; x < GRID_SIZE; x++) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [newX - 1, y],
              };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[y][newX] = tileId;
            newTiles[tileId] = {
              ...currentTile,
              position: [newX, y],
            };
            previousTile = newTiles[tileId];
            if (!isEqual(currentTile.position, [newX, y])) {
              hasChanged = true;
            }
            newX++;
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case ActionType.MOVE_RIGHT: {
      const newBoard = createBoard();
      const newTiles: TileMap = {};
      let hasChanged = false;
      let { score } = state;

      for (let y = 0; y < GRID_SIZE; y++) {
        let newX = GRID_SIZE - 1;
        let previousTile: Tile | undefined;

        for (let x = GRID_SIZE - 1; x >= 0; x--) {
          const tileId = state.board[y][x];
          const currentTile = state.tiles[tileId];

          if (!isNil(tileId)) {
            if (previousTile?.value === currentTile.value) {
              score += previousTile.value * 2;
              newTiles[previousTile.id as string] = {
                ...previousTile,
                value: previousTile.value * 2,
              };
              newTiles[tileId] = {
                ...currentTile,
                position: [newX + 1, y],
              };
              previousTile = undefined;
              hasChanged = true;
              continue;
            }

            newBoard[y][newX] = tileId;
            newTiles[tileId] = {
              ...state.tiles[tileId],
              position: [newX, y],
            };
            previousTile = newTiles[tileId];
            if (!isEqual(currentTile.position, [newX, y])) {
              hasChanged = true;
            }
            newX--;
          }
        }
      }
      return {
        ...state,
        board: newBoard,
        tiles: newTiles,
        hasChanged,
        score,
      };
    }
    case ActionType.RESET_GAME:
      return initialState;
    case ActionType.SHOW_GAME_OVER:
      return {
        ...state,
        isGameOver: true,
      };
    default:
      return state;
  }
}
