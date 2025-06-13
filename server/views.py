from flask import Blueprint, request, jsonify, current_app
import os
from dateutil import parser
import uuid
from server.app.models import PlexConnection
from server.app.client_controller import cec_power_on, play_on_chromecast
from server.app.ticket_printer import print_tickets

api_bp = Blueprint('api', __name__)

def start_movie(movie):
    play_on_chromecast(movie, current_app.config['CLIENT_NAME'])

@api_bp.route('/movies', methods=['GET'])
def list_movies():
    search = request.args.get('filter[search]')

    plex = PlexConnection(current_app.config['PLEX_URL'], current_app.config['PLEX_TOKEN'])
    all_movies = plex.list_movies(search)

    return jsonify({
        'data': [movie.to_dict() for movie in all_movies],
        'meta': {
            'current_page': 1, # page,
            'total_count': len(all_movies),
            'total_pages': 1, # total_pages,
            'page_size': len(all_movies) # per_page
        }
    })

@api_bp.route('/movies/<guid>', methods=['GET'])
def get_movie(guid):
    movie = PlexConnection(current_app.config['PLEX_URL'], current_app.config['PLEX_TOKEN']).find_movie(guid)
    return jsonify({
        'data': movie.to_dict()
    })

@api_bp.route('/movies/<guid>/play', methods=['POST'])
def play_movie(guid):
    data = request.get_json()
    seats = data['seats']
    time = parser.parse(data['time'])
    movie = PlexConnection(current_app.config['PLEX_URL'], current_app.config['PLEX_TOKEN']).find_movie(guid)

    print_tickets(movie, seats, time)
    current_app.extensions['scheduler'].add_job(
        id=str(uuid.uuid4()),
        func=start_movie,
        trigger='date',
        run_date=time,
        args=[movie.plex_object]
    )

    return jsonify({
        'data': movie.to_dict()
    })
