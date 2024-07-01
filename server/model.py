"""Data Models for Zest Quest."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Player(db.Model):
    """A Player."""

    __tablename__ = "players"

    player_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    player_number = db.Column(db.Integer, nullable=False)
    game_settings_id = db.Column(db.Integer, db.ForeignKey("game_settings.game_settings_id"), nullable=False)

    game_settings = db.relationship("Game_Settings", back_populates="players")
    round_results = db.relationship("Round_Results", back_populates="player")

    def __repr__(self):
        return f'<Player player_id={self.player_id} player_number={self.player_number}>'

    def to_dict(self):
        return {'player_id': self.player_id,
                'player_number': self.player_number,
                'game_settings_id': self.game_settings_id}
    

class Restaurant(db.Model):
    """A Restaurant."""

    __tablename__ = "restaurants"

    restaurant_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    yelp_business_id = db.Column(db.String(100), nullable=False)
    total_points = db.Column(db.Integer, nullable=False, default=0)

    round_results = db.relationship("Round_Results", back_populates="restaurant")

    def __repr__(self):
        return f'<Restaurant restaurant_id={self.restaurant_id} yelp_business_id={self.yelp_business_id} total_points={self.total_points}>'

    def to_dict(self):
        return {'restaurant_id': self.restaurant_id,
                'yelp_business_id': self.yelp_business_id,
                'total_points': self.total_points}
    

class Game_Settings(db.Model):
    """Game settings selected by players."""

    __tablename__ = "game_settings"

    game_settings_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    location = db.Column(db.String(100), nullable=False)
    category_1 = db.Column(db.String(100), nullable=False)
    category_2 = db.Column(db.String(100), nullable=False)
    category_3 = db.Column(db.String(100), nullable=False)
    max_dist = db.Column(db.Integer, nullable=False)
    num_players = db.Column(db.Integer, nullable=False)

    players = db.relationship("Player", back_populates="game_settings")
    round_results = db.relationship("Round_Results", back_populates="game_settings")

    def __repr__(self):
        return f'<Game Settings game_settings_id={self.game_settings_id} location={self.location} num_players={self.num_players}>'

    def to_dict(self):
        return {'game_settings_id': self.game_settings_id,
                'location': self.location,
                'category_1': self.category_1,
                'category_2': self.category_2,
                'category_3': self.category_3,
                'max_dist': self.max_dist,
                'num_players': self.num_players}
    

class Round_Results(db.Model):
    """Results of each round for a given player."""

    __tablename__ = "round_results"

    round_results_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    round = db.Column(db.Integer, nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey("players.player_id"), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.restaurant_id"), nullable=False)
    game_settings_id = db.Column(db.Integer, db.ForeignKey("game_settings.game_settings_id"), nullable=False)

    player = db.relationship("Player", back_populates="round_results")
    restaurant = db.relationship("Restaurant", back_populates="round_results")
    game_settings = db.relationship("Game_Settings", back_populates="round_results")

    def __repr__(self):
        return f'<Round Results round_results_id={self.round_results_id} round={self.round} player_id={self.player_id}>'

    def to_dict(self):
        return {'round_results_id': self.round_results_id,
                'round': self.round,
                'player_id': self.player_id,
                'restaurant_id': self.restaurant_id,
                'game_settings_id': self.game_settings_id}


def connect_to_db(flask_app, db_uri="postgresql:///zest-quest-database", echo=True):
    flask_app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
    flask_app.config["SQLALCHEMY_ECHO"] = echo
    flask_app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    db.app = flask_app
    db.init_app(flask_app)

    with flask_app.app_context():
        db.create_all()

    print("Connected to the Zest Quest db!")


if __name__ == "__main__":
    from routes import app

    connect_to_db(app)