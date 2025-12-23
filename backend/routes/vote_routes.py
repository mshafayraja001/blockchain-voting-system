from flask import Blueprint, request, jsonify
from web3 import Web3
import json, os
from dotenv import load_dotenv

load_dotenv()

vote_bp = Blueprint('vote', __name__)

INFURA_URL = os.getenv("INFURA_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
WALLET_ADDRESS = Web3.to_checksum_address(
    os.getenv("WALLET_ADDRESS")
)
CONTRACT_ADDRESS = Web3.to_checksum_address(
    os.getenv("CONTRACT_ADDRESS")
)

# 🔴 DEBUG (1 dafa run kar ke dekhna)
print("CONTRACT:", CONTRACT_ADDRESS)

w3 = Web3(Web3.HTTPProvider(INFURA_URL))

if not w3.is_connected():
    raise Exception("Web3 not connected")

with open("abi.json") as f:
    ABI = json.load(f)

contract = w3.eth.contract(
    address=Web3.to_checksum_address(CONTRACT_ADDRESS),
    abi=ABI
)


@vote_bp.route('/cast', methods=['POST'])
def cast_vote():
    data = request.json
    candidate_id = data.get('candidate_id')
    roll = data.get('roll')

    try:
        nonce = w3.eth.get_transaction_count(WALLET_ADDRESS)

        txn = contract.functions.castVote(
            int(candidate_id),
            w3.keccak(text=str(roll))
        ).build_transaction({
            'from': WALLET_ADDRESS,
            'nonce': nonce,
            'gas': 200000,
            'gasPrice': w3.to_wei('10', 'gwei')
        })

        signed_txn = w3.eth.account.sign_transaction(
        txn, PRIVATE_KEY
        )

        tx_hash = w3.eth.send_raw_transaction(
        signed_txn.raw_transaction
        )

        return jsonify({
            "message": "Vote cast successfully",
            "tx_hash": tx_hash.hex()
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
