import { makeObservable, observable } from 'mobx';
import _ from 'lodash';

class SeatViewModel {
  selected = false;

  constructor(model) {
    makeObservable(this, {
      selected: observable
    });

    _.merge(this, model);
  }

  toggleSelection() {
    this.selected = !this.selected;
  }
}

export default SeatViewModel;
