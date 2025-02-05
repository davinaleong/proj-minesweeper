import React from "react"

interface WonProps {
  resetGame: () => void
}

export const Won: React.FC<WonProps> = ({ resetGame }) => (
  <div className="won-dialog fixed inset-0 flex items-center justify-center z-50 backdrop">
    <section className="relative bg-white rounded-lg w-md p-6 m-4">
      <button
        type="button"
        className="sticky top-0 float-right text-red-700 hover:text-red-900 transition-colors text-6xl"
        onClick={resetGame} // Attach the onHide function to the button click
      >
        &times;
      </button>

      <div className="text-center flow">
        <h2 className="text-2xl font-bold text-slate-700">You've Won!</h2>

        <div className="text-5xl">😀</div>

        <div>
          <button
            className="px-4 py-2 text-bold bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            onClick={resetGame}
          >
            New Game
          </button>
        </div>
      </div>
    </section>
  </div>
)
