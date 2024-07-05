from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import config

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config.POSTGRES_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = config.USERS_TABLE
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(128), unique=True, nullable=False)
    subscription = db.Column(db.String(128), nullable=False)
