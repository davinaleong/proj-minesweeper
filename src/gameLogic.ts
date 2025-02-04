import { Board, GameConfig } from "./types"
import { CELL_STATES } from "./constants"

// Creates an empty game board with the specified size
// Each cell is initialized with default values (no mine, no neighbors, hidden state)
export const createEmptyBoard = (config: GameConfig): Board => {
  return Array(config.BOARD_SIZE)
    .fill(null)
    .map(() =>
      Array(config.BOARD_SIZE)
        .fill(null)
        .map(() => ({
          isMine: false, // No mine initially
          neighbor_mines: 0, // No neighboring mines initially
          state: CELL_STATES.HIDDEN, // Cell starts hidden
        }))
    )
}

// Randomly places mines on the board
// Ensures mines are placed only in empty cells
export const placeMines = (board: Board, config: GameConfig): Board => {
  // Create deep copy of board to maintain immutability
  const newBoard = JSON.parse(JSON.stringify(board))
  let minesPlaced = 0

  // Keep placing mines until we reach the desired count
  while (minesPlaced < config.MINES_COUNT) {
    // Generate random coordinates
    const x = Math.floor(Math.random() * config.BOARD_SIZE)
    const y = Math.floor(Math.random() * config.BOARD_SIZE)

    // Place mine only if cell doesn't already have one
    if (!newBoard[y][x].isMine) {
      newBoard[y][x].isMine = true
      minesPlaced++
    }
  }

  return newBoard
}

// Calculates the number of adjacent mines for each non-mine cell
export const calculateNeighborMines = (
  board: Board,
  config: GameConfig
): Board => {
  // Create deep copy of board to maintain immutability
  const newBoard = JSON.parse(JSON.stringify(board))

  // Iterate through each cell
  for (let y = 0; y < config.BOARD_SIZE; y++) {
    for (let x = 0; x < config.BOARD_SIZE; x++) {
      // Only calculate for non-mine cells
      if (!newBoard[y][x].isMine) {
        newBoard[y][x].neighbor_mines = countAdjacentMines(
          newBoard,
          x,
          y,
          config
        )
      }
    }
  }

  return newBoard
}

// Counts the number of mines in the 8 cells surrounding a given cell
export const countAdjacentMines = (
  board: Board,
  x: number,
  y: number,
  config: GameConfig
): number => {
  let count = 0

  // Check all 8 adjacent cells
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const ny = y + dy
      const nx = x + dx

      // Make sure we're within board boundaries and count if cell contains mine
      if (
        ny >= 0 &&
        ny < config.BOARD_SIZE &&
        nx >= 0 &&
        nx < config.BOARD_SIZE &&
        board[ny][nx].isMine
      ) {
        count++
      }
    }
  }

  return count
}
