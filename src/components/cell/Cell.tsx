import React from "react"
import { CellData } from "./../../types"
import { CELL_STATES } from "./../../constants"
import "./cell.css"

interface CellProps {
  cell: CellData
  onReveal: () => void
  onFlag: (e: React.MouseEvent) => void
}

export const Cell: React.FC<CellProps> = ({ cell, onReveal, onFlag }) => (
  <button
    className={`
      w-12 h-12 flex items-center justify-center cell
      ${cell.state === CELL_STATES.HIDDEN ? "cell-hidden" : "cell-shown"}
      ${cell.state === CELL_STATES.FLAGGED ? "cell-flagged" : ""}
      ${cell.state === CELL_STATES.MINE ? "cell-mine" : ""}
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
