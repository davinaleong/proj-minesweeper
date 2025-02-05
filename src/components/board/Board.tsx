import React from "react"
import { Cell } from "./../cell/Cell"
import { Board as BoardType } from "./../../types"

interface BoardProps {
  board: BoardType
  placeFlag: boolean
  onReveal: (y: number, x: number) => void
  onFlag: (y: number, x: number) => void
}

export const Board: React.FC<BoardProps> = ({
  board,
  placeFlag,
  onReveal,
  onFlag,
}) => (
  <div className="grid grid-cols-10 max-w-md mx-auto">
    {board.map((row, y) =>
      row.map((cell, x) => (
        <Cell
          key={`${y}-${x}`}
          cell={cell}
          placeFlag={placeFlag}
          onReveal={() => onReveal(y, x)}
          onFlag={() => onFlag(y, x)}
        />
      ))
    )}
  </div>
)
