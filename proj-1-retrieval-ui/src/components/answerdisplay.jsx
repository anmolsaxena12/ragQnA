import React from "react";

export default function AnswerDisplay({ answer, displayedText }) {
  if (!answer) return null;
  return (
    <div className="mt-6 bg-slate-950/70 rounded-2xl p-5 text-slate-100 shadow-inner border border-gray-800">
      <h2 className="text-lg font-bold mb-3">Answer:</h2>
      <p className="font-mono text-lg tracking-tight min-h-[3rem] transition-all">{displayedText}</p>
      {answer.score !== undefined && (
        <p className="mt-3 text-sm font-medium">
          Confidence:{" "}
          <span className={`${
            answer.score > 0.75 ? "text-green-400" : 
            answer.score > 0.5 ? "text-yellow-400" : 
            "text-red-400"
          }`}>
            {(answer.score * 100).toFixed(1)}%
          </span>
        </p>
      )}
      {answer.sources && answer.sources.length > 0 && (
        <>
          <h3 className="mt-4 font-semibold">Sources:</h3>
          <ul className="list-disc pl-6">
            {answer.sources.map((src, i) => (
              <li key={i} className="truncate text-slate-300">{src}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
