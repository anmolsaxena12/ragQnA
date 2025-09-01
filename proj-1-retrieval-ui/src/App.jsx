import React from "react";
import QABox from "./components/QABox";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Retrieval-Augmented Q&A
      </h1>
      <QABox />
    </div>
  );
}
