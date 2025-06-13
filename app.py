from flask import Flask, send_from_directory, jsonify
from server.views import api_bp
from server.config import Config
from flask_apscheduler import APScheduler
import os

app = Flask(__name__, static_folder='dist', static_url_path='')

app.config['PLEX_URL'] = os.environ.get('PLEX_URL')
app.config['PLEX_TOKEN'] = os.environ.get('PLEX_TOKEN')
app.config['ORIGINS'] = os.environ.get('PLEX_TICKETING_ORIGINS', '').split()
app.config['CLIENT_NAME'] = os.environ.get('CLIENT_NAME')

app.config.from_object(Config())

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()

app.register_blueprint(api_bp, url_prefix='/api')

@app.route('/')
def serve_react():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_react_routes(path):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5067, debug=False)
