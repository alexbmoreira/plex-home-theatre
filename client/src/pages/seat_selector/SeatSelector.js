import React from 'react';
import { observer } from 'mobx-react';
import { withState } from '../../utils';
import { SeatSelectorState } from './state';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const Seat = observer(({seat}) => {
  return (
    <div onClick={() => seat.toggleSelection()}>
      <i className={`material-icons hover:text-amethyst active:text-amethyst-active ${seat.selected ? 'text-amethyst-hover' : ''}`}>{'chair'}</i>
    </div>
  );
})

const Seats = observer(({uiState}) => {
  const {seats} = uiState;

  if (_.isEmpty(seats)) return null;

  return (
    <div className='text-powder text-6xl cursor-pointer text-2xl select-none space-y-2'>
      <div className='flex w-full justify-center space-x-1'>
        <Seat seat={seats[0]}/>
        <Seat seat={seats[1]}/>
        <Seat seat={seats[2]}/>
        <Seat seat={seats[3]}/>
      </div>
      <div className='flex w-full justify-center space-x-1'>
        <Seat seat={seats[4]}/>
        <Seat seat={seats[5]}/>
        <Seat seat={seats[6]}/>
        <Seat seat={seats[7]}/>
        <Seat seat={seats[8]}/>
        <Seat seat={seats[9]}/>
      </div>
    </div>
  );
});

const SeatPicker = observer(({uiState}) => {
  return (
    <div>
      <Seats uiState={uiState}/>
    </div>
  );
});

const SeatSelector = observer(({uiState}) => {
  const {movie} = uiState;

  return (
    <div className='py-16 px-64'>
      <div className='mb-4 select-none cursor-pointer'>
        <Link to='/'>
          <span className='flex items-center'><i className='material-icons text-3xl'>{'chevron_left'}</i>{'Select Movie'}</span>
        </Link>
      </div>
      <div className='flex h-96 rounded'>
        <img src={movie.image} alt={movie.title} className='rounded'/>
        <div className='ml-16 p-1'>
          <div className='text-2xl'>{movie.title}</div>
        </div>
      </div>
      <div className='font-serif text-3xl my-4 text-center'>{'Select Seats'}</div>
      <SeatPicker uiState={uiState}/>
      <div className='flex justify-end mr-32 mt-16'>
        <div onClick={() => uiState.selectSeats()} className='select-none cursor-pointer inline-flex p-2 bg-amethyst hover:bg-amethyst-hover active:bg-amethyst-active text-xl'>
          <span className='flex items-center'>{'Print Tickets'}<i className='material-icons text-3xl'>{'chevron_right'}</i></span>
        </div>
      </div>
    </div>
  );
});

export default withState(SeatSelector, SeatSelectorState);
