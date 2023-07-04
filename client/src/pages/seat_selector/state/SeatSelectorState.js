import { makeObservable, observable, action } from 'mobx';
import { matchPath } from 'react-router';
import { fetchData, postData } from '../../../api/api.service'
import { SeatViewModel } from '../../../store';

class SeatSelectorState {
  movie = {};
  seats = [];

  constructor() {
    makeObservable(this, {
      movie: observable,
      seats: observable,
      load: action,
      selectSeats: action
    });
  }

  async load() {
    this.guid = matchPath({ path: "/select-seats/:guid" }, window.location.pathname).params.guid;
    const movie = await fetchData(`/api/movies/${this.guid}`)
    this.movie = movie;
    this.seats = Array.from({length: 10}, () => new SeatViewModel());
  }

  async selectSeats() {
    const movie = await postData(`/api/movies/${this.guid}/play`)

    if (movie) {
      window.location = '/';
      this.seats = Array.from({length: 10}, () => new SeatViewModel());
    }
  }
}

export default SeatSelectorState;
