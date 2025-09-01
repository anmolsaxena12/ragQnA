import os
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter

def load_pdf(path: str) -> str:
    """Load text from a PDF file."""
    reader = PdfReader(path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def chunk_text(text: str, chunk_size=500, overlap=50):
    """Split text into overlapping chunks for embeddings."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=overlap
    )
    return splitter.split_text(text)

if __name__ == "__main__":
    pdf_path = "../data/sample.pdf"  # change to your file
    raw_text = load_pdf(pdf_path)
    chunks = chunk_text(raw_text)
    print(f"Loaded {len(chunks)} chunks from {pdf_path}")
