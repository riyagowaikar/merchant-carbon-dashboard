from fastapi import FastAPI
import uuid
import hashlib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

transactions = []

def assign_credits(merchant: str):
    merchant = merchant.lower()
    if "solar" in merchant or "renewable" in merchant:
        return {"credits": 5, "type": "Green"}
    elif "fuel" in merchant or "coal" in merchant:
        return {"credits": -2, "type": "Polluting"}
    else:
        return {"credits": 0, "type": "Neutral"}

@app.post("/transactions")
def add_transaction(merchant: str, amount: int):
    result = assign_credits(merchant)
    tx = {
        "id": str(uuid.uuid4()),
        "merchant": merchant,
        "amount": amount,
        "hash": hashlib.md5(f"{merchant}{amount}".encode()).hexdigest(),
        "credits": result["credits"],
        "type": result["type"]
    }
    transactions.append(tx)
    return tx

@app.get("/transactions")
def get_transactions():
    return transactions
