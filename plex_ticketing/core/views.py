from dotenv import load_dotenv
from flask import Flask, jsonify
from flask_cors import CORS
from ..app.plex_ticketing import Server
import os

load_dotenv()

app = Flask(__name__)
app.config['PLEX_URL'] = os.environ.get('PLEX_URL')
app.config['PLEX_TOKEN'] = os.environ.get('PLEX_TOKEN')
app.config['PLEX_CLIENT'] = os.environ.get('PLEX_CLIENT')
app.config['ORIGIN'] = os.environ.get('ORIGIN')
CORS(app, origins=app.config['ORIGIN'])

@app.route('/api/movies/', methods=['GET'])
def list_movies():
    movies = Server(app.config['PLEX_URL'], app.config['PLEX_TOKEN'], app.config['PLEX_CLIENT']).list_movies()
    return jsonify([movie.to_dict() for movie in movies])

@app.route('/api/movies/<guid>', methods=['GET'])
def get_movie(guid):
    movie = Server(app.config['PLEX_URL'], app.config['PLEX_TOKEN'], app.config['PLEX_CLIENT']).find_movie(guid)
    return jsonify(movie.to_dict())

@app.route('/api/movies/<guid>/play/', methods=['POST'])
def play_movie(guid):
    movie = Server(app.config['PLEX_URL'], app.config['PLEX_TOKEN'], app.config['PLEX_CLIENT']).play_movie(guid)
    return jsonify(movie.to_dict())
