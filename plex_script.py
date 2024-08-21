from plexapi.server import PlexServer
from dotenv import load_dotenv
import os
import subprocess

load_dotenv()

baseurl = os.environ.get('PLEX_URL')
token = os.environ.get('PLEX_TOKEN')
client = os.environ.get('PLEX_CLIENT')

def turn_on_projector():
    try:
        # subprocess.run(["echo", '"on 0"', "|", "cec-client", "-s", "-d", "1"], check=True)
        subprocess.run(["cec-client", "-s", "-d", "1"], input="on 0\n", text=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Failed to turn on projector: {e}")

turn_on_projector()

# plex = PlexServer(baseurl, token)
# client = next(client for client in plex.clients() if client.title == client)
# movies = plex.library.section('Movies')


# for movie in movies.all():
#     print(movie.guids[0].id)

# response = client.playMedia(movie)
