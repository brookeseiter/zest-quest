"""CRUD Operations."""

from model import db, Player, Restaurant, Game_Settings, Round_Results, connect_to_db

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

# def get_player_settings():
#     settings = Game_Settings.query.all()
#     # for setting in settings:
#     #     print(setting.player_location)
#     for setting in settings:
#         print(setting)
#     # return Game_Settings.query.all()

# WORKS with 1 CAT
# def get_formatted_url(location,max_dist,category_1):
#     print('location:', location)
#     print('max_dist:', max_dist)
#     print('category_1:', category_1)

#     location = '%20'.join(location.split())
#     max_dist = str(int(round(int(max_dist) * 1609.344, 0)))
#     category_1 = restaurant_categories_dict[category_1].lower()

#     url = f"https://api.yelp.com/v3/businesses/search?location={location}&radius={max_dist}&categories={category_1}&open_now=true&sort_by=best_match&limit=2"
    
#     return url

def get_formatted_url(location,max_dist,category):
    print('location:', location)
    print('max_dist:', max_dist)
    print('category:', category)

    location = '%20'.join(location.split())
    max_dist = str(int(round(int(max_dist) * 1609.344, 0)))
    category = restaurant_categories_dict[category].lower()

    url = f"https://api.yelp.com/v3/businesses/search?location={location}&radius={max_dist}&categories={category}&open_now=true&sort_by=best_match&limit=2"
    
    return url


if __name__ == "__main__":
    from routes import app

    connect_to_db(app)
    # if app doesnt run, comment out this line
    app.app_context().push()