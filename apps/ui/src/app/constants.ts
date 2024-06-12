// ==== Configurable Grid Size ====
export const GRID_SIZE = 6; // [4, 5, 6]
export const GRID_SIZE_MULTIPLIER = {
  4: 11.5,
  5: 12.2,
  6: 12.5,
};

// ==== Game Layout ====
export const MOBILE_WIDTH = 67 * GRID_SIZE;
export const DESKTOP_WIDTH = 116 * GRID_SIZE;

// ==== Animations ====
export const MERGE_ANIMATION_DURATION = 100; // ms
export const MOVE_ANIMATION_DURATION = 200; // ms

// ==== Moves ====
export const CREATE_TILE = "create_tile";
export const CLEAN_UP = "clean_up";
export const RESET_GAME = "reset_game";
export const MOVE_UP = "move_up";
export const MOVE_DOWN = "move_down";
export const MOVE_LEFT = "move_left";
export const MOVE_RIGHT = "move_right";
export const SHOW_GAME_OVER = "show_game_over";
