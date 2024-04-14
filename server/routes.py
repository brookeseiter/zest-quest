"""Routes for Zest Quest App."""

from flask import (Flask, render_template, request, jsonify, session)
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
def save_settings_to_session():
    """Save game settings (number of players, location, max distance) to Flask session."""

    session['num_players'] = request.json['num_players']
    session['location'] = request.json['location']
    session['max_dist'] = request.json['max_dist']

    return jsonify({'message': 'Player settings saved to session'}), 200

@app.route('/categories', methods=['POST'])
def finalize_game_settings():
    """Captures restaurant categories and creates settings for new game."""

    category_1 = request.json['category_1']
    category_2  = request.json['category_2']
    category_3  = request.json['category_3']

    num_players = session['num_players']
    location = session['location']
    max_dist = session['max_dist']

    game_settings = crud.create_game_settings(num_players,location,max_dist,category_1,category_2,category_3)

    db.session.add(game_settings)
    db.session.commit()

    session_data = dict(session)
    print("Session Data:", session_data)

    return jsonify(game_settings.to_dict()), 200


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)