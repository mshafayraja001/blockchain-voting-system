from flask import Blueprint, jsonify
from web3 import Web3
import json, os
from dotenv import load_dotenv

load_dotenv()

admin_bp = Blueprint('admin', __name__)

INFURA_URL = os.getenv("INFURA_URL")
CONTRACT_ADDRESS = Web3.to_checksum_address(
    os.getenv("CONTRACT_ADDRESS")
)

w3 = Web3(Web3.HTTPProvider(INFURA_URL))

with open("abi.json") as f:
    ABI = json.load(f)

contract = w3.eth.contract(
    address=CONTRACT_ADDRESS,
    abi=ABI
)


@admin_bp.route('/results', methods=['GET'])
def get_results():
    try:
        total_votes = contract.functions.totalVotes().call()

        candidate_0 = 0
        candidate_1 = 0

        for i in range(total_votes):
            vote = contract.functions.votes(i).call()
            candidate_id = vote[0]

            if candidate_id == 0:
                candidate_0 += 1
            elif candidate_id == 1:
                candidate_1 += 1

        return jsonify({
            "total_votes": total_votes,
            "candidate_0": candidate_0,
            "candidate_1": candidate_1
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
