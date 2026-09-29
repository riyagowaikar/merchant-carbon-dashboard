import requests

resp = requests.post(
    "http://127.0.0.1:8000/transactions",
    params={"merchant": "Solar Shop", "amount": 100}
)

print(resp.json())
