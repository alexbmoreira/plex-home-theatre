from plexapi.server import PlexServer

baseurl = 'http://10.88.111.5:32400'
token = 'x8q9mQPoZ6diHkt9vHBh'

plex = PlexServer(baseurl, token)
client = next(client for client in plex.clients() if client.title == 'TV 2021')
movies = plex.library.section('Movies')


for movie in movies.all():
    print(movie.guids[0].id)
# .get('The Pink Panther')

# print(movie)

# response = client.playMedia(movie)
