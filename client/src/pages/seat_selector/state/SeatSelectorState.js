import { makeObservable, observable, action } from 'mobx';
import { matchPath } from 'react-router';
import { fetchData } from '../../../api/api.service'
import _ from 'lodash';

class SeatSelectorState {
  movie = {};

  constructor() {
    makeObservable(this, {
      movie: observable,
      load: action
    });
  }

  async load() {
    const guid = matchPath({ path: "/select-seats/:guid" }, window.location.pathname).params.guid;
    // const movie = await fetchData(`/movies/${guid}`)
    this.movie = {};
  }
}

export default SeatSelectorState;
