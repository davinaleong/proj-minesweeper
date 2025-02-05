import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import ReactMarkdown from "react-markdown"
import { DialogState } from "./../../types"
import { DIALOG_STATES } from "./../../constants"
import "./updates.css"

interface UpdatesProps {
  updates: DialogState
  setUpdates: Dispatch<SetStateAction<DialogState>>
}

export const Updates: React.FC<UpdatesProps> = ({ updates, setUpdates }) => {
  const [markdown, setMarkdown] = useState<string>("")
  const [error, setError] = useState<string>("")

  useEffect(() => {
    const loadUpdates = async () => {
      try {
        // Using URL constructor to ensure the path is resolved correctly
        const updatesPath = new URL("./updates.md", import.meta.url).href

        const response = await fetch(updatesPath)

        if (!response.ok) {
          throw new Error(`Failed to load updates: ${response.statusText}`)
        }

        const text = await response.text()
        setMarkdown(text)
      } catch (err) {
        console.error("Error loading updates:", err)
        setError("Failed to load game updates. Please try refreshing the page.")
      }
    }

    loadUpdates()
  }, [])

  const onHide = () => {
    setUpdates(DIALOG_STATES.HIDDEN)
  }

  return (
    <div
      className={`updates-dialog ${
        updates === DIALOG_STATES.HIDDEN ? "hidden" : ""
      } fixed inset-0 flex items-center justify-center z-50 backdrop`}
    >
      <section className="relative bg-white rounded-lg max-w-2xl w-11/12 md:w-3/4 p-6 m-4 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          className="sticky top-0 float-right text-red-700 hover:text-red-900 transition-colors text-6xl"
          onClick={onHide} // Attach the onHide function to the button click
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Updates</h2>

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
