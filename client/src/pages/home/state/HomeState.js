import { makeObservable, observable, action } from 'mobx';
import { fetchData } from '../../../api/api.service'
import _ from 'lodash';

class HomeState {
  movies = [];
  search = '';
  fetchingMovies = true;

  constructor() {
    makeObservable(this, {
      movies: observable,
      search: observable,
      fetchingMovies: observable,
      load: action
    });
  }

  async load() {
    this.fetchingMovies = true;
    const movies = await fetchData(`/api/movies?search=${this.search}`);
    this.movies = movies;
    this.fetchingMovies = false;
  }

  async updateSearch(value) {
    this.search = value;
    await this.load();
  }
}

export default HomeState;
