// Game Types

// Represents the data structure for each cell on the board
export interface CellData {
  isMine: boolean // Whether this cell contains a mine
  neighbor_mines: number // Number of adjacent mines (0-8)
  state: CellState // Current visual state of the cell
}

// Possible states a cell can be in:
// - hidden: Default state, unrevealed
// - revealed: Clicked and showing number
// - flagged: Marked as potential mine
// - mine: Revealed mine (game over)
export type CellState = "hidden" | "revealed" | "flagged" | "mine"

// 2D array representing the game board
// Each element is a CellData object
export type Board = CellData[][]

// Configuration options for game setup
export interface GameConfig {
  BOARD_SIZE: number // Width/height of the board (square)
  MINES_COUNT: number // Total number of mines to place
}

// Complete game state including board and game status
export interface GameState {
  board: Board // Current state of the game board
  gameOver: boolean // Whether game is lost (hit mine)
  gameWon: boolean // Whether game is won (all non-mines revealed)
}

// Misc Types
// State for dialog modal/overlay
// - hidden: Dialog are not visible
// - shown: Dialog are visible to player
export type DialogState = "hidden" | "shown"

// State for instructions modal/overlay
// - hidden: Instructions are not visible
// - shown: Instructions are visible to player
export type Languages = "en" | "zh-sg" | "ms" | "ta"
