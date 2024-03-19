"""CRUD operations."""

from model import db, Player, Restaurant, Game_Settings, Round_Results, connect_to_db
# from sqlalchemy.sql import func, insert, update

def create_player_settings(num_players, location, max_dist):
    """Create and return player settings for new game."""

    settings = Game_Settings(
        num_players=num_players,
        player_location=location,
        search_radius=max_dist
    )
    print(settings)

    return settings