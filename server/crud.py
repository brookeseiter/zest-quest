"""CRUD Operations."""

from model import db, Player, Restaurant, Game_Settings, Round_Results, connect_to_db

def create_player_settings(num_players, location, max_dist):
    """Create and return player settings for new game."""

    settings = Game_Settings(
        num_players=num_players,
        player_location=location,
        search_radius=max_dist
    )
    print(settings)

    return settings

def get_player_settings():
    settings = Game_Settings.query.all()
    for setting in settings:
        print(setting.player_location)
    # return Game_Settings.query.all()


if __name__ == "__main__":
    from routes import app

    connect_to_db(app)
    # if app doesnt run, comment out this line
    app.app_context().push()