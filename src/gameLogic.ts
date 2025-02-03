import { Board, GameConfig } from "./types"
import { CELL_STATES } from "./constants"

export const createEmptyBoard = (config: GameConfig): Board => {
  return Array(config.BOARD_SIZE)
    .fill(null)
    .map(() =>
      Array(config.BOARD_SIZE)
        .fill(null)
        .map(() => ({
          isMine: false,
          neighbor_mines: 0,
          state: CELL_STATES.HIDDEN,
        }))
    )
}

export const placeMines = (board: Board, config: GameConfig): Board => {
  const newBoard = JSON.parse(JSON.stringify(board))
  let minesPlaced = 0

  while (minesPlaced < config.MINES_COUNT) {
    const x = Math.floor(Math.random() * config.BOARD_SIZE)
    const y = Math.floor(Math.random() * config.BOARD_SIZE)

    if (!newBoard[y][x].isMine) {
      newBoard[y][x].isMine = true
      minesPlaced++
    }
  }

  return newBoard
}

export const calculateNeighborMines = (
  board: Board,
  config: GameConfig
): Board => {
  const newBoard = JSON.parse(JSON.stringify(board))

  for (let y = 0; y < config.BOARD_SIZE; y++) {
    for (let x = 0; x < config.BOARD_SIZE; x++) {
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

export const countAdjacentMines = (
  board: Board,
  x: number,
  y: number,
  config: GameConfig
): number => {
  let count = 0

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const ny = y + dy
      const nx = x + dx
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
