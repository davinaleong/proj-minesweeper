import React, { useEffect, useState, Dispatch, SetStateAction } from "react"
import ReactMarkdown from "react-markdown"
import { DialogState, Languages as LanguagesType } from "./../../types"
import { DIALOG_STATES, LANGUAGES } from "./../../constants"
import "./instructions.css"

interface InstructionsProps {
  instructions: DialogState
  setInstructions: Dispatch<SetStateAction<DialogState>>
}

export const Instructions: React.FC<InstructionsProps> = ({
  instructions,
  setInstructions,
}) => {
  const [language, setLanguage] = useState<LanguagesType>(LANGUAGES.ENGLISH)

  const [english, setEnglish] = useState<string>("")
  const [chinese, setChinese] = useState<string>("")
  const [malay, setMalay] = useState<string>("")
  const [tamil, setTamil] = useState<string>("")

  const [error, setError] = useState<string>("")

  useEffect(() => {
    const loadEnglishInstructions = async () => {
      try {
        // Using URL constructor to ensure the path is resolved correctly
        const englishPath = new URL(`./en.md`, import.meta.url).href

        const response = await fetch(englishPath)

        if (!response.ok) {
          throw new Error(
            `Failed to load English instructions: ${response.statusText}`
          )
        }

        const text = await response.text()
        setEnglish(text)
      } catch (err) {
        console.error("Error loading English instructions:", err)
        setError(
          "Failed to load English instructions. Please try refreshing the page."
        )
      }
    }

    const loadChineseInstructions = async () => {
      try {
        // Using URL constructor to ensure the path is resolved correctly
        const chinesePath = new URL(`./zh-sg.md`, import.meta.url).href

        const response = await fetch(chinesePath)

        if (!response.ok) {
          throw new Error(
            `Failed to load Chinese instructions: ${response.statusText}`
          )
        }

        const text = await response.text()
        setChinese(text)
      } catch (err) {
        console.error("Error loading Chinese instructions:", err)
        setError(
          "Failed to load Chinese instructions. Please try refreshing the page."
        )
      }
    }

    const loadMalayInstructions = async () => {
      try {
        // Using URL constructor to ensure the path is resolved correctly
        const malayPath = new URL(`./ms.md`, import.meta.url).href

        const response = await fetch(malayPath)

        if (!response.ok) {
          throw new Error(
            `Failed to load Malay instructions: ${response.statusText}`
          )
        }

        const text = await response.text()
        setMalay(text)
      } catch (err) {
        console.error("Error loading Malay instructions:", err)
        setError(
          "Failed to load Malay instructions. Please try refreshing the page."
        )
      }
    }

    const loadTamilInstructions = async () => {
      try {
        // Using URL constructor to ensure the path is resolved correctly
        const tamilPath = new URL(`./ta.md`, import.meta.url).href

        const response = await fetch(tamilPath)

        if (!response.ok) {
          throw new Error(
            `Failed to load Tamil instructions: ${response.statusText}`
          )
        }

        const text = await response.text()
        setTamil(text)
      } catch (err) {
        console.error("Error loading Tamil instructions:", err)
        setError(
          "Failed to load Tamil instructions. Please try refreshing the page."
        )
      }
    }

    loadEnglishInstructions()
    loadChineseInstructions()
    loadMalayInstructions()
    loadTamilInstructions()
  }, [])

  const onHide = () => {
    setInstructions(DIALOG_STATES.HIDDEN)
  }

  const onEnglish = () => {
    setLanguage(LANGUAGES.ENGLISH)
  }

  const onChinese = () => {
    setLanguage(LANGUAGES.CHINESE)
  }

  const onMalay = () => {
    setLanguage(LANGUAGES.MALAY)
  }

  const onTamil = () => {
    setLanguage(LANGUAGES.TAMIL)
  }

  return (
    <div
      className={`instructions-dialog ${
        instructions === DIALOG_STATES.HIDDEN ? "hidden" : ""
      } fixed inset-0 flex items-center justify-center z-50 backdrop`}
    >
      <section className="relative bg-white rounded-lg max-w-2xl w-11/12 md:w-3/4 p-3 m-4 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          className="sticky top-0 float-right text-red-700 hover:text-red-900 transition-colors text-6xl"
          onClick={onHide} // Attach the onHide function to the button click
        >
          &times;
        </button>

        <h2 className="text-2xl text-center font-bold text-gray-900 mb-6">
          How to Play
        </h2>

        <div className="flex align-center justify-center gap-1">
          <button
            type="button"
            className={`text-xl px-2 py-1 text-white ${
              language === LANGUAGES.ENGLISH
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-500 hover:bg-slate-600"
            } rounded`}
            onClick={onEnglish}
          >
            English
          </button>
          <button
            type="button"
            className={`text-xl px-2 py-1 text-white ${
              language === LANGUAGES.CHINESE
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-500 hover:bg-slate-600"
            } rounded`}
            onClick={onChinese}
          >
            中文
          </button>
          <button
            type="button"
            className={`text-xl px-2 py-1 text-white ${
              language === LANGUAGES.MALAY
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-500 hover:bg-slate-600"
            } rounded`}
            onClick={onMalay}
          >
            Melayu
          </button>
          <button
            type="button"
            className={`text-xl px-2 py-1 text-white ${
              language === LANGUAGES.TAMIL
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-slate-500 hover:bg-slate-600"
            } rounded`}
            onClick={onTamil}
          >
            தமிழ்
          </button>
        </div>

        {error ? (
          <p className="text-red-500 mt-4">{error}</p>
        ) : (
          <div className="prose prose-sm text-left max-w-none mt-6">
            <ReactMarkdown
              className={`flow ${
                language !== LANGUAGES.ENGLISH ? "hidden" : ""
              }`}
            >
              {english}
            </ReactMarkdown>
            <ReactMarkdown
              className={`flow ${
                language !== LANGUAGES.CHINESE ? "hidden" : ""
              }`}
            >
              {chinese}
            </ReactMarkdown>
            <ReactMarkdown
              className={`flow ${language !== LANGUAGES.MALAY ? "hidden" : ""}`}
            >
              {malay}
            </ReactMarkdown>
            <ReactMarkdown
              className={`flow ${language !== LANGUAGES.TAMIL ? "hidden" : ""}`}
            >
              {tamil}
            </ReactMarkdown>
          </div>
        )}
      </section>
    </div>
  )
}
