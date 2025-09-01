import faiss
import pickle
from sentence_transformers import SentenceTransformer
from transformers import pipeline

INDEX_PATH = "../index/faiss.index"
CHUNKS_PATH = "../index/chunks.pkl"

class RetrievalQA:
    def __init__(self, model_name="all-MiniLM-L6-v2", llm="distilbert-base-cased-distilled-squad"):
        # Embedding model
        self.embedder = SentenceTransformer(model_name)
        # LLM QA pipeline
        self.qa_model = pipeline("question-answering", model=llm)
        # Load FAISS index
        self.index = faiss.read_index(INDEX_PATH)
        # Load chunks
        with open(CHUNKS_PATH, "rb") as f:
            self.chunks = pickle.load(f)

    def retrieve(self, query, top_k=5):
        """Retrieve top-k relevant chunks."""
        q_emb = self.embedder.encode([query])
        scores, idxs = self.index.search(q_emb, top_k)
        return [self.chunks[i] for i in idxs[0]]

    def answer(self, query):
        """Generate answer from retrieved docs."""
        top_chunks = self.retrieve(query, top_k=5)
        context = " ".join(top_chunks)
        result = self.qa_model(question=query, context=context)
        return {"answer": result["answer"], "score": result["score"], "sources": top_chunks}

if __name__ == "__main__":
    qa = RetrievalQA()
    query = "What is the purpose of this document?"
    print(qa.answer(query))
