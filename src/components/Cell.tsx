import React from "react"
import { CellData } from "../types"
import { CELL_STATES } from "../constants"

interface CellProps {
  cell: CellData
  onReveal: () => void
  onFlag: (e: React.MouseEvent) => void
}

export const Cell: React.FC<CellProps> = ({ cell, onReveal, onFlag }) => (
  <button
    className={`
      w-8 h-8 flex items-center justify-center
      border border-gray-400
      ${cell.state === CELL_STATES.HIDDEN ? "bg-gray-200" : "bg-white"}
      ${cell.state === CELL_STATES.FLAGGED ? "bg-yellow-200" : ""}
      ${cell.state === CELL_STATES.MINE ? "bg-red-500" : ""}
    `}
    onClick={onReveal}
    onContextMenu={onFlag}
  >
    {cell.state === CELL_STATES.REVEALED &&
      cell.neighbor_mines > 0 &&
      cell.neighbor_mines}
    {cell.state === CELL_STATES.FLAGGED && "🚩"}
    {cell.state === CELL_STATES.MINE && "💣"}
  </button>
)
