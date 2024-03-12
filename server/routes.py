"""Routes for Zest Quest app."""

from flask import (Flask, render_template, request, jsonify)
from model import connect_to_db, db
# from flask_cors import CORS
# from dotenv import load_dotenv
import os 
import crud

# load_dotenv()

# Create the Flask application
app = Flask(__name__)
app.secret_key = os.environ['FLASK_SECRET_KEY']
# CORS(app, supports_credentials=True)

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)