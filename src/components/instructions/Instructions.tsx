import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import { InstructionStates } from "./../../types"
import { INSTRUCTIONS_STATES } from "./../../constants"
import "./instructions.css"

interface InstructionsProps {
  instructions: InstructionStates
  setInstructions: React.FC<InstructionStates>
}

export const Instructions: React.FC<InstructionsProps> = ({
  instructions,
  setInstructions,
}) => {
  //const [state, setState] = useState(INSTRUCTIONS_STATES.SHOWN)
  const [markdown, setMarkdown] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const loadInstructions = async () => {
      try {
        // Using URL constructor to ensure the path is resolved correctly
        const instructionsPath = new URL("./en.md", import.meta.url).href

        const response = await fetch(instructionsPath)

        if (!response.ok) {
          throw new Error(`Failed to load instructions: ${response.statusText}`)
        }

        const text = await response.text()
        setMarkdown(text)
      } catch (err) {
        console.error("Error loading instructions:", err)
        setError(
          "Failed to load game instructions. Please try refreshing the page."
        )
      }
    }

    loadInstructions()
  }, [])

  const onHide = () => {
    setInstructions(INSTRUCTIONS_STATES.HIDDEN)
  }

  return (
    <div
      className={`instructions-dialog ${
        instructions === INSTRUCTIONS_STATES.HIDDEN ? "hidden" : ""
      } fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
    >
      <section className="relative bg-white rounded-lg shadow-xl max-w-2xl w-11/12 md:w-3/4 p-6 m-4 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          className="sticky top-0 float-right text-red-700 hover:text-red-900 transition-colors text-6xl"
          onClick={onHide} // Attach the onHide function to the button click
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Play</h2>

        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : (
          <div className="prose prose-sm text-left max-w-none mt-6">
            <ReactMarkdown className="flow">{markdown}</ReactMarkdown>
          </div>
        )}
      </section>
    </div>
  )
}
