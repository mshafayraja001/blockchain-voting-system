from flask import Flask
from flask_cors import CORS
from routes.voter_routes import voter_bp
from routes.vote_routes import vote_bp
from routes.admin_routes import admin_bp



app = Flask(__name__)
CORS(app)

app.register_blueprint(voter_bp, url_prefix='/api/voter')
app.register_blueprint(vote_bp, url_prefix="/api/vote")
app.register_blueprint(admin_bp, url_prefix="/api/admin")



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

