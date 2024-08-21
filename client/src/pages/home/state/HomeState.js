import { makeObservable, observable, action } from 'mobx';
import { fetchData } from '../../../api/api.service'

class HomeState {
  movies = [];
  search = '';
  loadingMovies = true;

  constructor() {
    makeObservable(this, {
      movies: observable,
      search: observable,
      loadingMovies: observable,
      load: action
    });
  }

  async load() {
    this.loadingMovies = true;
    const movies = await fetchData(`/api/movies?search=${this.search}`);
    this.movies = movies;
    this.loadingMovies = false;
  }

  async updateSearch(value) {
    this.search = value;
    await this.load();
  }
}

export default HomeState;
