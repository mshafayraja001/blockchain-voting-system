import face_recognition
import pickle


def extract_face_encoding(image_path):
    image = face_recognition.load_image_file(image_path)
    encodings = face_recognition.face_encodings(image)

    if len(encodings) == 0:
        return None

    return pickle.dumps(encodings[0])


def compare_faces(stored_encoding, login_image_path):
    stored_encoding = pickle.loads(stored_encoding)

    image = face_recognition.load_image_file(login_image_path)
    login_encodings = face_recognition.face_encodings(image)

    if len(login_encodings) == 0:
        return False

    distance = face_recognition.face_distance(
        [stored_encoding],
        login_encodings[0]
    )[0]

    print("FACE DISTANCE:", distance)
    return distance < 0.6
