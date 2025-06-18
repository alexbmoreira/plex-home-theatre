import _ from 'lodash';

class SeatViewModel {
  constructor(seat, onToggle) {
    this.row = seat.row;
    this.number = seat.number;
    this.selected = seat.selected;
    this.onToggle = onToggle;
  }

  toggleSelection() {
    this.onToggle(this.id);
  }

  get id() {
    return `${this.row}${this.number}`;
  }
}

class SeatSelectionViewModel {
  constructor(seats, onUpdate) {
    this.seats = seats.map(s => new SeatViewModel(s, id => this.toggleSeat(id)));
    this.onUpdate = onUpdate;
  }

  toggleSeat(seatId) {
    const updatedSeats = _.map(this.seats, seat =>
      seat.id === seatId
        ? { ...seat, selected: !seat.selected }
        : seat
    );
    this.onUpdate(updatedSeats);
  }

  get selectedSeats() {
    return _.filter(this.seats, 'selected');
  }
}

export default SeatSelectionViewModel;
