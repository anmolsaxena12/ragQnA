import React, { useState, useEffect, useRef } from "react";
import QuestionInput from "./QuestionInput";
import AnswerDisplay from "./AnswerDisplay";

export default function QABox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const typingInterval = useRef(null);

  useEffect(() => {
    if (answer && answer.answer) {
      setDisplayedText("");
      let idx = 0;
      clearInterval(typingInterval.current);
      typingInterval.current = setInterval(() => {
        setDisplayedText((text) => text + answer.answer.charAt(idx));
        idx++;
        if (idx >= answer.answer.length) clearInterval(typingInterval.current);
      }, 14);
    }
    return () => clearInterval(typingInterval.current);
  }, [answer]);

  const askQuestion = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setAnswer(null);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setAnswer(data);
    } catch {
      setAnswer({ answer: "Error fetching answer.", sources: [] });
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 dark">
      <div className="w-full max-w-2xl p-8 shadow-2xl rounded-3xl bg-gradient-to-br from-slate-900 via-gray-800 to-gray-900 border border-gray-700">
        <h2 className="text-2xl font-semibold text-slate-300 text-center mb-8">Ask Anything About Your Documents</h2>
        <QuestionInput
          question={question}
          setQuestion={setQuestion}
          askQuestion={askQuestion}
          loading={loading}
        />
        <AnswerDisplay answer={answer} displayedText={displayedText} />
      </div>
    </div>
  );
}
