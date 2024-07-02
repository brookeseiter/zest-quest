"""CRUD Operations."""

from model import db, Player, Restaurant, Game_Settings, Round_Results, Game_Restaurant, connect_to_db

restaurant_categories_dict = {
    "American": "newamerican",
    "BBQ": "bbq",
    "Chinese": "Chinese",
    # "Fast Food": "hotdogs",
    "Indian": "indpak",
    "Italian": "italian",
    "Japanese": "japanese",
    "Mediterranean": "mediterranean",
    "Mexican": "mexican",
    "Middle Eastern": "mideastern",
    "Pizza": "pizza",
    "Seafood": "seafood",
    "Thai": "thai",
    "Vietnamese": "vietnamese"
}

def create_players(num_players, game_settings_id):
    """Creates and returns an array of Player instances based on number of players."""

    players = []
    num_players = int(num_players)

    for i in range(1, num_players + 1):
        players.append(Player(player_number=i, game_settings_id=game_settings_id))
    
    return players

# def get_all_players():
#     return Player.query.all()

def get_all_restaurants():
    restaurants = Restaurant.query.all()
    return [restaurant.to_dict() for restaurant in restaurants]

def get_all_game_restaurants():
    game_restaurants = Game_Restaurant.query.all()
    return [gr.to_dict() for gr in game_restaurants]

def create_game_settings(num_players, location, max_dist, category_1, category_2, category_3):
    """Create and return player-selected settings for new game."""

    settings = Game_Settings(
        num_players=num_players,
        location=location,
        max_dist=max_dist,
        category_1=category_1,
        category_2=category_2,
        category_3=category_3
    )

    print('settings:',settings)

    return settings

def get_formatted_url(location,max_dist,category):
    print('location:', location)
    print('max_dist:', max_dist)
    print('category:', category)

    location = '%20'.join(location.split())
    max_dist = str(int(round(int(max_dist) * 1609.344, 0)))
    category = restaurant_categories_dict[category].lower()

    url = f"https://api.yelp.com/v3/businesses/search?location={location}&radius={max_dist}&categories={category}&open_now=true&sort_by=best_match&limit=2"
    
    return url

def create_restaurant(yelp_data_response, game_settings_id):
    for business in yelp_data_response['businesses']:
        # Check if the restaurant already exists
        restaurant = Restaurant.query.filter_by(yelp_business_id=business['id']).first()
        if not restaurant:
            restaurant = Restaurant(yelp_business_id=business['id'])
            db.session.add(restaurant)
            db.session.commit()
            print('session after restaurant:', db.session)

        # Check if the Game_Restaurant link already exists
        game_restaurant = Game_Restaurant.query.filter_by(game_settings_id=game_settings_id, restaurant_id=restaurant.restaurant_id).first()
        if not game_restaurant:
            game_restaurant = Game_Restaurant(
                game_settings_id=game_settings_id,
                restaurant_id=restaurant.restaurant_id
            )
            db.session.add(game_restaurant)
            db.session.commit()
            print('session after game_restaurant:', db.session)
    return print('done')



if __name__ == "__main__":
    from routes import app

    connect_to_db(app)
    # if app doesnt run, comment out this line
    app.app_context().push()