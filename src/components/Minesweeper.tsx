import React from "react"
import { Board } from "./Board"
import { useGame } from "../hooks/useGame"
import { GAME_CONFIG } from "../constants"

export const Minesweeper: React.FC = () => {
  const { board, gameOver, revealCell, toggleFlag, resetGame } =
    useGame(GAME_CONFIG)

  return (
    <div className="p-4">
      <Board board={board} onReveal={revealCell} onFlag={toggleFlag} />
      {gameOver && (
        <div className="text-center mt-4">
          <div className="text-red-600 font-bold">Game Over!</div>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  )
}
