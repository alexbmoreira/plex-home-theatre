from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from ..app.plex_ticketing import Server, Cast
import os
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from time import sleep
import subprocess

load_dotenv()

scheduler = BackgroundScheduler()
scheduler.start()

app = Flask(__name__)
app.config['PLEX_URL'] = os.environ.get('PLEX_URL')
app.config['PLEX_TOKEN'] = os.environ.get('PLEX_TOKEN')
app.config['CHROMECAST_NAME'] = os.environ.get('CHROMECAST_NAME')
app.config['ORIGIN'] = os.environ.get('ORIGIN')
CORS(app, origins=app.config['ORIGIN'])

def turn_on_projector():
    try:
        subprocess.run(["cec-client", "-s", "-d", "1"], input="on 0\n", text=True, check=True)
        sleep(15)
    except subprocess.CalledProcessError as e:
        print(f"Failed to turn on projector: {e}")

@app.route('/api/movies', methods=['GET'])
def list_movies():
    movies = Server(app.config['PLEX_URL'], app.config['PLEX_TOKEN']).list_movies()
    return jsonify([movie.to_dict() for movie in movies])

@app.route('/api/movies/<guid>', methods=['GET'])
def get_movie(guid):
    movie = Server(app.config['PLEX_URL'], app.config['PLEX_TOKEN']).find_movie(guid)
    return jsonify(movie.to_dict())

@app.route('/api/movies/<guid>/play', methods=['POST'])
def play_movie(guid):
    # data = request.get_json()
    # start_time = datetime.strptime(data.get('start_time'), '%Y-%m-%dT%H:%M')
    # scheduler.add_job(turn_on_projector, 'date', run_date=start_time)
    turn_on_projector()

    movie = Cast(app.config['PLEX_URL'], app.config['PLEX_TOKEN'], app.config['CHROMECAST_NAME']).play_movie(guid)
    return jsonify(movie.to_dict())
