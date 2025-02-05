import React, { useState } from "react"
import { Board } from "./../board/Board"
import { Instructions } from "../instructions/Instructions"
import { Updates } from "../updates/Updates"
import { useGame } from "./../../hooks/useGame"
import {
  GAME_CONFIG,
  INSTRUCTIONS_STATES,
  UPDATES_STATES,
} from "./../../constants"

export const Minesweeper: React.FC = () => {
  const { board, gameOver, revealCell, toggleFlag, resetGame } =
    useGame(GAME_CONFIG)
  const [instructions, setInstructions] = useState(INSTRUCTIONS_STATES.SHOWN)
  const [updates, setUpdates] = useState(UPDATES_STATES.HIDDEN)

  const onInstructionsShow = () => {
    setInstructions(INSTRUCTIONS_STATES.SHOWN)
  }

  const onUpdatesShow = () => {
    setUpdates(UPDATES_STATES.SHOWN)
  }

  return (
    <main className="main | wrapper mx-auto p-4 flow">
      <header className="main__header">
        <div className="text-center flow">
          <h1 className="text-6xl font-bold">Dav/Minesweeper</h1>
          <p className="text-sm">A simple Minesweeper game</p>
        </div>
      </header>

      <div className="game-status text-center my-4">
        <Instructions
          instructions={instructions}
          setInstructions={setInstructions}
        />

        {!gameOver ? (
          <div className="text-4xl">😀</div>
        ) : (
          <div className="text-center">
            <div className="text-4xl">😭</div>
            <button
              className="mt-2 px-4 py-2 text-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={resetGame}
            >
              New Game
            </button>
          </div>
        )}
      </div>

      <Board board={board} onReveal={revealCell} onFlag={toggleFlag} />

      <footer className="main__footer | mt-8 flow">
        <p className="flex align-middle justify-center gap-3">
          <button
            type="button"
            className="p-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
            onClick={onInstructionsShow}
          >
            How to Play
          </button>
          <button
            type="button"
            className="p-2 text-white bg-slate-500 hover:bg-slate-600 rounded"
            onClick={onUpdatesShow}
          >
            Updates
          </button>
        </p>
        <p className="text-center text-sm text-gray-500">
          Dav/Minesweeper by{" "}
          <a
            href="mailto:leong.shi.yun@gmail.com"
            className="text-blue-500 hover:text-blue-600"
          >
            Davina Leong
          </a>
        </p>
      </footer>

      <Updates updates={updates} setUpdates={setUpdates} />
    </main>
  )
}
