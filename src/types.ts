export interface CellData {
  isMine: boolean
  neighbor_mines: number
  state: CellState
}

export type CellState = "hidden" | "revealed" | "flagged" | "mine"
export type Board = CellData[][]

export interface GameConfig {
  BOARD_SIZE: number
  MINES_COUNT: number
}

export interface GameState {
  board: Board
  gameOver: boolean
  gameWon: boolean
}
