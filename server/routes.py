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

@app.route('/<path>')
def route(path):
    return render_template('index.html')

@app.route('/<path>/<code>')
def nested_route(path, code):
    return render_template('index.html')

@app.route('/settings', methods=['POST'])
def save_settings():
    """Saves player settings for game."""

    num_players = request.json['num_players']
    location = request.json['location']
    max_dist = request.json['max_dist']

    new_game_settings = crud.create_player_settings(num_players,location,max_dist)
    print(new_game_settings)
    db.session.add(new_game_settings)
    db.session.commit()

    return render_template('index.html')

if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)