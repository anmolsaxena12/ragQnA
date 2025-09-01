import React, { useState } from "react";
import axios from "axios";

export default function QABox() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/answer", {
        question: question,
      });
      setAnswer(res.data);
    } catch (error) {
      console.error(error);
      setAnswer({ answer: "Error fetching answer", sources: [] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
      <input
        type="text"
        className="w-full p-2 border rounded-md mb-4"
        placeholder="Ask a question about the document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={askQuestion}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Searching..." : "Ask"}
      </button>

      {answer && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Answer:</h2>
          <p className="mt-2 text-gray-700">{answer.answer}</p>
          <p className="text-sm text-gray-500 mt-1">
            Confidence: {(answer.score * 100).toFixed(1)}%
          </p>
          <h3 className="mt-4 font-semibold text-gray-700">Sources:</h3>
          <ul className="list-disc list-inside text-gray-600">
            {answer.sources.map((src, i) => (
              <li key={i}>{src}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
