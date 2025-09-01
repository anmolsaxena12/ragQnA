import React from "react";

export default function QuestionInput({ question, setQuestion, askQuestion, loading }) {
  const onKeyDown = (e) => {
    if (e.key === "Enter") askQuestion();
  };
  return (
    <div className="flex gap-3 mb-8">
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type your question here..."
        className="flex-grow px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-700 outline-none transition"
        disabled={loading}
      />
      <button
        onClick={askQuestion}
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-purple-700 to-pink-500 text-white font-bold rounded-xl shadow hover:scale-105 transition-transform duration-200 disabled:opacity-60 disabled:cursor-not-allowed relative"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="animate-spin w-5 h-5 border-2 border-t-2 border-pink-500 border-t-white rounded-full"></span>
            <span>Asking...</span>
          </span>
        ) : (
          "Ask"
        )}
      </button>
    </div>
  );
}
