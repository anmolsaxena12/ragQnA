import numpy as np
import faiss
import pickle
from sentence_transformers import SentenceTransformer
from ingest import load_pdf, chunk_text

INDEX_PATH = "../index/faiss.index"
CHUNKS_PATH = "../index/chunks.pkl"

def build_index(pdf_path: str):
    """Embed chunks and build FAISS index."""
    # Load and chunk docs
    text = load_pdf(pdf_path)
    chunks = chunk_text(text)

    # Load embedding model
    model = SentenceTransformer("all-MiniLM-L6-v2")

    # Encode all chunks
    embeddings = model.encode(chunks, convert_to_numpy=True, show_progress_bar=True)

    # Build FAISS index
    dim = embeddings.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(embeddings)

    # Save index + chunks
    faiss.write_index(index, INDEX_PATH)
    with open(CHUNKS_PATH, "wb") as f:
        pickle.dump(chunks, f)

    print(f"Indexed {len(chunks)} chunks from {pdf_path}")

if __name__ == "__main__":
    build_index("../data/sample.pdf")
