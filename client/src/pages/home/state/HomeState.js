import { makeObservable, observable, action } from 'mobx';
import { fetchData } from '../../../api/api.service'
import _ from 'lodash';

class HomeState {
  movies = [];
  fetchingMovies = true;

  constructor() {
    makeObservable(this, {
      movies: observable,
      fetchingMovies: observable,
      load: action
    });
  }

  async load() {
    this.fetchingMovies = true;
    const movies = await fetchData('/api/movies')
    this.movies = movies;
    this.fetchingMovies = false;
  }
}

export default HomeState;
