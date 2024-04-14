"""Data Models for Zest Quest."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Player(db.Model):
    """A Player."""

    __tablename__ = "players"

    player_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    
    round_results = db.relationship("Round_Results", back_populates="players")

    def __repr__(self):
        return f'<Player player_id={self.player_id}>'

    def to_dict(self):
        return {'player_id': self.player_id}
    

class Restaurant(db.Model):
    """A Restaurant."""

    __tablename__ = "restaurants"

    restaurant_id = db.Column(db.Integer,
                        autoincrement=True,
                        primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    price = db.Column(db.String(10), nullable=False)
    category = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    total_points = db.Column(db.Integer, nullable=False)

    round_results = db.relationship("Round_Results", back_populates="restaurants")

    def __repr__(self):
        return f'<Restaurant restaurant_id={self.restaurant_id} name={self.name} category={self.category}>'

    def to_dict(self):
        return {'restaurant_id': self.restaurant_id,
                'name': self.name,
                'rating': self.rating,
                'category': self.category,
                'address': self.address,
                'image_url': self.image_url,
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

    def __repr__(self):
        return f'<Game Settings game_settings_id={self.game_settings_id}>'

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
    round_number = db.Column(db.Integer, nullable=False)
    rank = db.Column(db.Integer, nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey("players.player_id"))
    restaurant_id = db.Column(db.Integer, db.ForeignKey("restaurants.restaurant_id"))

    players = db.relationship("Player", back_populates="round_results")
    restaurants = db.relationship("Restaurant", back_populates="round_results")

    def __repr__(self):
        return f'<Round Results round_results_id={self.round_results_id} round_number={self.round_number} player_id={self.player_id}>'

    def to_dict(self):
        return {'round_results_id': self.round_results_id,
                'round_number': self.round_number,
                'rank': self.rank,
                'player_id': self.player.player_id,
                'restaurant_id': self.restaurant.restaurant_id}


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