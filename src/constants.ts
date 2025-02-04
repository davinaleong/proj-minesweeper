import { GameConfig } from "./types"

// Default game configuration
// Creates a 10x10 board with 10 mines (10% mine density)
export const GAME_CONFIG: GameConfig = {
  BOARD_SIZE: 10, // Creates a 10x10 grid
  MINES_COUNT: 10, // Places 10 mines on the board
}

// Possible states for each cell on the board
export const CELL_STATES = {
  HIDDEN: "hidden" as const, // Default state, cell not yet clicked
  REVEALED: "revealed" as const, // Cell has been clicked and shows number
  FLAGGED: "flagged" as const, // Cell marked as potential mine
  MINE: "mine" as const, // Revealed mine (only shown on game over)
}

// States for the instructions modal/overlay
export const INSTRUCTIONS_STATES = {
  HIDDEN: "hidden" as const, // Instructions are not visible
  SHOWN: "shown" as const, // Instructions are being displayed
}
