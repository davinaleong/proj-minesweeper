import React from "react"
import { Board } from "./Board"
import { useGame } from "../hooks/useGame"
import { GAME_CONFIG } from "../constants"

export const Minesweeper: React.FC = () => {
  const { board, gameOver, revealCell, toggleFlag, resetGame } =
    useGame(GAME_CONFIG)

  return (
    <main className="main | wrapper mx-auto p-4 flow">
      <header className="main__header">
        <div className="text-center flow">
          <h1 className="text-3xl font-bold">Dav/Minesweeper</h1>
          <p className="text-sm">A simple Minesweeper game</p>
        </div>
      </header>
      {!gameOver && <div className="text-4xl">😀</div>}
      {gameOver && (
        <div className="text-center mt-4">
          <div className="text-4xl">😭</div>
        </div>
      )}
      <Board board={board} onReveal={revealCell} onFlag={toggleFlag} />
      {gameOver && (
        <div className="text-center mt-4">
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            New Game
          </button>
        </div>
      )}
      <footer className="main__footer">
        <p className="text-center text-xs text-gray-500">
          Dav/Minesweeper by{" "}
          <a href="mailto:leong.shi.yun@gmail.com">Davina Leong</a>
        </p>
      </footer>
    </main>
  )
}
