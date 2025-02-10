import { useState, useCallback, useRef } from "react"
import { Board, GameState, GameConfig } from "../types"
import { CELL_STATES } from "../constants"
import {
  createEmptyBoard,
  placeMines,
  calculateNeighborMines,
} from "../gameLogic"

export const useGame = (config: GameConfig) => {
  const survivedMines = useRef(0)
  const lastBoard = useRef<Board | null>(null)
  const originalBoard = useRef<Board | null>(null)

  const initializeBoard = (): Board => {
    if (lastBoard.current && survivedMines.current < config.MINES_TO_SURVIVE) {
      return JSON.parse(JSON.stringify(originalBoard.current))
    }

    let board = createEmptyBoard(config)
    board = placeMines(board, config)
    board = calculateNeighborMines(board, config)
    lastBoard.current = board
    originalBoard.current = JSON.parse(JSON.stringify(board))
    return board
  }

  const [gameState, setGameState] = useState<GameState>({
    board: initializeBoard(),
    gameOver: false,
    gameWon: false,
  })

  const revealCell = useCallback(
    (y: number, x: number): void => {
      if (gameState.gameOver || gameState.gameWon) return

      setGameState((prevState) => {
        const newBoard: Board = JSON.parse(JSON.stringify(prevState.board))

        const reveal = (y: number, x: number): void => {
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

          newBoard[y][x].state = CELL_STATES.REVEALED

          if (newBoard[y][x].neighbor_mines === 0) {
            for (let dy = -1; dy <= 1; dy++) {
              for (let dx = -1; dx <= 1; dx++) {
                reveal(y + dy, x + dx)
              }
            }
          }
        }

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

        survivedMines.current++
        reveal(y, x)
        return { ...prevState, board: newBoard }
      })
    },
    [gameState.gameOver, gameState.gameWon, config]
  )

  const toggleFlag = useCallback(
    (y: number, x: number): void => {
      if (gameState.gameOver || gameState.gameWon) return

      setGameState((prevState) => {
        const newBoard: Board = JSON.parse(JSON.stringify(prevState.board))
        const cell = newBoard[y][x]

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

  const resetGame = useCallback(() => {
    if (gameState.gameOver) {
      if (survivedMines.current >= config.MINES_TO_SURVIVE) {
        survivedMines.current = 0
        lastBoard.current = null
        originalBoard.current = null
      }
    }
    setGameState({
      board: initializeBoard(),
      gameOver: false,
      gameWon: false,
    })
  }, [gameState.gameOver])

  return {
    board: gameState.board,
    gameOver: gameState.gameOver,
    gameWon: gameState.gameWon,
    revealCell,
    toggleFlag,
    resetGame,
  }
}
