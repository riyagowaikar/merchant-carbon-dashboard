from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Allow Vite frontend (localhost:5173) to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

transactions = []

class Transaction(BaseModel):
    merchant: str
    amount: float

@app.post("/transactions")
def add_transaction(tx: Transaction):
    new_tx = {
        "id": len(transactions) + 1,
        "merchant": tx.merchant,
        "amount": tx.amount,
        "hash": f"hash{len(transactions)+1}",
        "credits": 0
    }
    transactions.append(new_tx)
    return new_tx

@app.get("/transactions")
def get_transactions() -> List[dict]:
    return transactions
