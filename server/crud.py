"""CRUD Operations."""

from model import db, Player, Restaurant, Game_Settings, Round_Results, connect_to_db


def create_game_settings(num_players, location, max_dist, category_1, category_2, category_3):
    """Create and return player-selected settings for new game."""

    settings = Game_Settings(
        num_players=num_players,
        player_location=location,
        search_radius=max_dist,
        category_1=category_1,
        category_2=category_2,
        category_3=category_3
    )

    return settings

def get_player_settings():
    settings = Game_Settings.query.all()
    # for setting in settings:
    #     print(setting.player_location)
    for setting in settings:
        print(setting)
    # return Game_Settings.query.all()


if __name__ == "__main__":
    from routes import app

    connect_to_db(app)
    # if app doesnt run, comment out this line
    app.app_context().push()