from plexapi.server import PlexServer
    
class Movie():
    def __init__(self, guid, title, image, runtime):
        self.guid = guid.replace('imdb://', '')
        self.title = title
        self.image = image
        self.runtime = runtime

    def to_dict(self):
        return {
            'guid': self.guid,
            'title': self.title,
            'image': self.image,
            'runtime': self.runtime
        }

class Server():
    def __init__(self, baseurl, token, clientTitle):
        self.baseurl = baseurl
        self.token = token
        self.clientTitle = clientTitle
        self.server = self.__connect()
        self.client = self.__client(clientTitle)

    def list_movies(self):
        return [Movie(movie.guids[0].id, movie.title, movie.posterUrl, movie.media[0].duration) for movie in self.__movies().all()]

    def find_movie(self, guid):
        movie = self.__movies().getGuid(f'imdb://{guid}')
        return Movie(movie.guids[0].id, movie.title, movie.thumb, movie.media[0].duration)

    def play_movie(self, guid):
        movie = self.__movies().getGuid(f'imdb://{guid}')
        self.client.playMedia(movie)
        return Movie(movie.guids[0].id, movie.title, movie.thumb, movie.media[0].duration)

    def __movies(self):
        return self.server.library.section('Movies')

    def __client(self, title):
        return next((client for client in self.server.clients() if client.title == title), None)

    def __connect(self):
        return PlexServer(self.baseurl, self.token)
