import { useState, useMemo } from 'react';
import SeatSelectionViewModel from './SeatSelectionViewModel';

const SEATS = [
  { row: 'A', number: 1, selected: false },
  { row: 'A', number: 2, selected: false },
  { row: 'A', number: 3, selected: false },
  { row: 'A', number: 4, selected: false },
  { row: 'B', number: 1, selected: false },
  { row: 'B', number: 2, selected: false },
  { row: 'B', number: 3, selected: false },
  { row: 'B', number: 4, selected: false },
  { row: 'B', number: 5, selected: false },
  { row: 'B', number: 6, selected: false }
];

function useSeatSelection() {
  const [seats, setSeats] = useState(SEATS);

  const viewModel = useMemo(() => new SeatSelectionViewModel(seats, setSeats), [seats]);

  return viewModel;
}

export default useSeatSelection;
