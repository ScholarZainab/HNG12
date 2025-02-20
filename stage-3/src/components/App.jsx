import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { detectLanguage, summarizeText, translateText } from "./api";

const App = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("");
  const [summary, setSummary] = useState("");
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState("");

  const handleSend = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text.");
      return;
    }

    setOutputText(inputText);
    setError("");
    detectLanguage(inputText);
  };

  const detectLanguage = async (text) => {
    try {
      const response = await axios.post("/api/language-detection", { text });
      setDetectedLanguage(response.data.language);
    } catch (err) {
      setError("Failed to detect language.");
    }
  };

  const handleSummarize = async () => {
    try {
      const response = await axios.post("/api/summarizer", { text: outputText });
      setSummary(response.data.summary);
    } catch (err) {
      setError("Failed to summarize text.");
    }
  };

  const handleTranslate = async (language) => {
    try {
      const response = await axios.post("/api/translator", {
        text: outputText,
        target_language: language,
      });
      setTranslation(response.data.translation);
    } catch (err) {
      setError("Failed to translate text.");
    }
  };

  return (
    <div className="app">
      <div className="output-area">
        {outputText && (
          <div className="output-text">
            <p>{outputText}</p>
            {detectedLanguage && <p>Detected Language: {detectedLanguage}</p>}
            {outputText.length > 150 && detectedLanguage === "en" && (
              <button onClick={handleSummarize}>Summarize</button>
            )}
            <div className="translate-section">
              <select onChange={(e) => handleTranslate(e.target.value)}>
                <option value="en">English</option>
                <option value="pt">Portuguese</option>
                <option value="es">Spanish</option>
                <option value="ru">Russian</option>
                <option value="tr">Turkish</option>
                <option value="fr">French</option>
              </select>
              <button onClick={() => handleTranslate("en")}>Translate</button>
            </div>
            {summary && <p>Summary: {summary}</p>}
            {translation && <p>Translation: {translation}</p>}
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="input-area">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text here..."
          aria-label="Input text"
        />
        <button onClick={handleSend} aria-label="Send">
          <span role="img" aria-label="send-icon">
            ✉️
          </span>
        </button>
      </div>
    </div>
  );
};

export default App;
