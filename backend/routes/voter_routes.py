from flask import Blueprint, request, jsonify
from database import get_db
from services.face_service import extract_face_encoding, compare_faces
import os
import uuid

voter_bp = Blueprint('voter', __name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@voter_bp.route('/register', methods=['POST'])
def register_voter():
    name = request.form.get('name')
    roll = request.form.get('roll')
    image = request.files.get('image')

    if not name or not roll or not image:
        return jsonify({"error": "Missing fields"}), 400

    filename = f"{uuid.uuid4()}.jpg"
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(image_path)

    encoding = extract_face_encoding(image_path)
    if encoding is None:
        return jsonify({"error": "No face detected"}), 400

    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO voters (name, roll_no, face_encoding) VALUES (%s,%s,%s)",
        (name, roll, encoding)
    )
    db.commit()
    cursor.close()
    db.close()

    return jsonify({"message": "Voter registered successfully"})


@voter_bp.route('/login', methods=['POST'])
def login_voter():
    roll = request.form.get('roll')
    image = request.files.get('image')

    if not roll or not image:
        return jsonify({"error": "Missing fields"}), 400

    filename = f"{uuid.uuid4()}.jpg"
    image_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(image_path)

    db = get_db()
    cursor = db.cursor(dictionary=True)
    cursor.execute(
        "SELECT face_encoding FROM voters WHERE roll_no=%s",
        (roll,)
    )
    voter = cursor.fetchone()
    cursor.close()
    db.close()

    if not voter:
        return jsonify({"error": "Voter not found"}), 404

    if not compare_faces(voter['face_encoding'], image_path):
        return jsonify({"error": "Face mismatch"}), 401

    return jsonify({"message": "Login successful", "roll": roll})
