export const GAME_CONFIG: GameConfig = {
  BOARD_SIZE: 10,
  MINES_COUNT: 10,
}

export const CELL_STATES = {
  HIDDEN: "hidden" as const,
  REVEALED: "revealed" as const,
  FLAGGED: "flagged" as const,
  MINE: "mine" as const,
}
