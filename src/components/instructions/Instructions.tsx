import React, { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import "./instructions.css"

export const Instructions: React.FC = () => {
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

  return (
    <section className="instructions-section mt-8 p-4 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">How to Play</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="prose prose-sm text-left max-w-none">
          <ReactMarkdown className="flow">{markdown}</ReactMarkdown>
        </div>
      )}
    </section>
  )
}
