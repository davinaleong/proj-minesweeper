import { useState, useCallback } from "react"
import { Board, GameState, GameConfig } from "../types"
import { CELL_STATES } from "../constants"
import {
  createEmptyBoard,
  placeMines,
  calculateNeighborMines,
} from "../gameLogic"

// Custom hook to manage Minesweeper game state and logic
export const useGame = (config: GameConfig) => {
  // Helper function to create and initialize a new game board
  const initializeBoard = (): Board => {
    let board = createEmptyBoard(config) // Create empty board grid
    board = placeMines(board, config) // Randomly place mines
    board = calculateNeighborMines(board, config) // Calculate numbers for each cell
    return board
  }

  // Main game state containing board data and game status
  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    gameOver: false,
    gameWon: false,
  })

  // Handler for revealing a cell when clicked
  const revealCell = useCallback(
    (y: number, x: number): void => {
      // Prevent actions if game is already over or won
      if (gameState.gameOver || gameState.gameWon) return

      setGameState((prevState) => {
        // Create deep copy of board to maintain immutability
        const newBoard: Board = JSON.parse(JSON.stringify(prevState.board))

        // Recursive function to reveal cells and their neighbors
        const reveal = (y: number, x: number): void => {
          // Stop if:
          // - Out of board bounds
          // - Cell is already revealed
          // - Cell is flagged
          if (
            y < 0 ||
            y >= config.BOARD_SIZE ||
            x < 0 ||
            x >= config.BOARD_SIZE ||
            newBoard[y][x].state === CELL_STATES.REVEALED ||
            newBoard[y][x].state === CELL_STATES.FLAGGED
          ) {
            return
          }

          // Reveal current cell
          newBoard[y][x].state = CELL_STATES.REVEALED

          // If cell has no adjacent mines, reveal all neighboring cells
          if (newBoard[y][x].neighbor_mines === 0) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                reveal(y + dy, x + dx)
              }
            }
          }
        }

        // If mine is clicked, reveal all mines and end game
        if (newBoard[y][x].isMine) {
          for (let ry = 0; ry < config.BOARD_SIZE; ry++) {
            for (let rx = 0; rx < config.BOARD_SIZE; rx++) {
              if (newBoard[ry][rx].isMine) {
                newBoard[ry][rx].state = CELL_STATES.MINE
              }
            }
          }
          return { ...prevState, board: newBoard, gameOver: true }
        }

        // Reveal selected cell and its neighbors
        reveal(y, x)
        return { ...prevState, board: newBoard }
      })
    },
    [gameState.gameOver, gameState.gameWon, config]
  )

  // Handler for toggling flag on right-click
  const toggleFlag = useCallback(
    (y: number, x: number): void => {
      if (gameState.gameOver || gameState.gameWon) return

      setGameState((prevState) => {
        const newBoard: Board = JSON.parse(JSON.stringify(prevState.board))
        const cell = newBoard[y][x]

        // Toggle between hidden and flagged states
        if (cell.state === CELL_STATES.HIDDEN) {
          cell.state = CELL_STATES.FLAGGED
        } else if (cell.state === CELL_STATES.FLAGGED) {
          cell.state = CELL_STATES.HIDDEN
        }

        return { ...prevState, board: newBoard }
      })
    },
    [gameState.gameOver, gameState.gameWon]
  )

  // Handler to reset game to initial state
  const resetGame = useCallback(() => {
    setGameState({
      board: initializeBoard(),
      gameOver: false,
      gameWon: false,
    })
  }, [])

  // Return game state and handlers
  return {
    board: gameState.board,
    gameOver: gameState.gameOver,
    gameWon: gameState.gameWon,
    revealCell,
    toggleFlag,
    resetGame,
  }
}
