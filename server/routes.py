"""Routes for Zest Quest App."""

from flask import (Flask, render_template, request, jsonify, session)
from model import connect_to_db, db
# from flask_cors import CORS
# from dotenv import load_dotenv
import os 
import crud
import requests
from crud import restaurant_categories_dict


# load_dotenv()

# Create the Flask application
app = Flask(__name__)
app.secret_key = os.environ['FLASK_SECRET_KEY']
app.secret_key = os.environ['YELP_API_KEY']
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

    session['category_1'] = category_1
    session['category_2'] = category_2
    session['category_3'] = category_3

    num_players = session['num_players']
    location = session['location']
    max_dist = session['max_dist']

    game_settings = crud.create_game_settings(num_players,location,max_dist,category_1,category_2,category_3)

    db.session.add(game_settings)
    db.session.commit()

    print(db.session)
    print(session)
    return jsonify(game_settings.to_dict()), 200

@app.route('/yelp-api', methods=['GET'])
def get_restaurant_data():
    """Requests and returns restaurant data from Yelp Fusion API."""

    location = session['location']
    max_dist = session['max_dist']
    category_1 = session['category_1']

    url = crud.get_formatted_url(location,max_dist,category_1)

    # response = {"url": url}

    # return jsonify(response), 200
    headers = {
        "accept": "application/json",
        "Authorization": f"bearer {os.environ['YELP_API_KEY']}"
    }

    response = requests.get(url, headers=headers)

    if response:
        response_json = response.json()
        return jsonify(response_json), 200
    else:
        return jsonify({"error": "Failed to fetch restaurant data"}), 500


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)