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
    """Save game settings (number of players, location, max distance) and players to Flask session."""

    session['num_players'] = request.json['num_players']
    session['location'] = request.json['location']
    session['max_dist'] = request.json['max_dist']

    game_settings = crud.create_game_settings(
        location=session['location'],
        num_players=session['num_players'],
        max_dist=session['max_dist'],
        category_1="Category1",  # Placeholder value
        category_2="Category2",  # Placeholder value
        category_3="Category3"   # Placeholder value
    )

    db.session.add(game_settings)
    db.session.commit()

    session['game_settings_id'] = game_settings.game_settings_id
    print('SESSION: line 54, /settings', session)

    players = crud.create_players(session['num_players'], game_settings.game_settings_id)

    players_return =[]

    for player in players:
        db.session.add(player)
        db.session.commit()
        players_return.append(player.to_dict())

    # return jsonify({'message': 'Player settings saved to session, players created.', 'players': players}), 200
    return jsonify(players_return), 200

@app.route('/categories', methods=['POST'])
def finalize_game_settings():
    """Captures restaurant categories and creates settings for new game."""

    category_1 = request.json['category_1']
    category_2  = request.json['category_2']
    category_3  = request.json['category_3']

    session['category_1'] = category_1
    session['category_2'] = category_2
    session['category_3'] = category_3

    game_settings_id = session.get('game_settings_id')

    if game_settings_id:
        game_settings = crud.get_game_settings(game_settings_id)
        if game_settings:
            game_settings.category_1 = category_1
            game_settings.category_2 = category_2
            game_settings.category_3 = category_3

            db.session.commit()

            print('SESSION line 90 /categories:', session)
            return jsonify(game_settings.to_dict()), 200
        else:
            return jsonify({'error': 'Game settings not found.'}), 404
    else:
        return jsonify({'error': 'Game settings ID not found in session.'}), 400

@app.route('/yelp-api')
def get_restaurant_data():
    """Requests and returns restaurant data from Yelp Fusion API."""

    location = session['location']
    max_dist = session['max_dist']
    category = request.args.get('category', session.get('category_1'))
    game_settings_id = session.get('game_settings_id') 

    url = crud.get_formatted_url(location,max_dist,category)

    headers = {
        "accept": "application/json",
        "Authorization": f"bearer {os.environ['YELP_API_KEY']}"
    }

    response = requests.get(url, headers=headers)

    if response:
        response_json = response.json()
        crud.create_restaurant(response_json, game_settings_id)        
        return jsonify(response_json), 200
    else:
        return jsonify({"error": "Failed to fetch restaurant data"}), 500
    
@app.route('/round-results', methods=['POST'])
def save_round_results():
    """Saves the results of a round to database."""

    round_number = request.json['round']
    current_player = request.json['currentPlayer']
    yelp_business_id = request.json['yelpBusinessId']
    game_settings_id = request.json.get('gameSettingsId', session.get('game_settings_id'))

    round_results = crud.create_round_results(round_number,current_player,yelp_business_id,game_settings_id)

    if round_results:
        return jsonify(round_results.to_dict()), 201
    else:
        return jsonify({'error': 'Failed to save round results.'}), 500


if __name__ == "__main__":
    connect_to_db(app)
    app.run(host="0.0.0.0", debug=True)