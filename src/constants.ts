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

// States for the dialog modal/overlay
export const DIALOG_STATES = {
  HIDDEN: "hidden" as const, // Dialog are not visible
  SHOWN: "shown" as const, // Dialog are being displayed
}

// States for the instructions modal/overlay
export const INSTRUCTIONS_STATES = {
  HIDDEN: "hidden" as const, // Instructions are not visible
  SHOWN: "shown" as const, // Instructions are being displayed
}

// Define supported language codes as a TypeScript constant object
// Each language is mapped to its ISO language code
export const LANGUAGES = {
  // English - Standard English
  ENGLISH: "en" as const,

  // Chinese - Singapore variant of Chinese
  CHINESE: "zh-sg" as const,

  // Malay - Standard Malay
  MALAY: "ms" as const,

  // Tamil - Standard Tamil
  TAMIL: "ta" as const,
}

// States for the updates modal/overlay
export const UPDATES_STATES = {
  HIDDEN: "hidden" as const, // Updates are not visible
  SHOWN: "shown" as const, // Updates are being displayed
}
