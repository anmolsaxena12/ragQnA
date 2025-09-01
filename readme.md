# Retrieval-Augmented Q&A System

A simple Retrieval-Augmented Generation (RAG) pipeline that answers questions from your own documents using embeddings + FAISS + LLM.

---

## 📌 Features
- Ingest PDF documents and split into chunks
- Embed text with `sentence-transformers`
- Store vectors in FAISS index for fast similarity search
- Retrieve top passages and answer queries using Hugging Face QA model
- FastAPI server with `/api/answer` endpoint
- (Optional) React UI for user queries