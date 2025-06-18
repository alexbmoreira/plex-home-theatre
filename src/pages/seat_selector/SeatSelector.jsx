import { useEffect, useState } from 'react';
import useSeatSelection from './useSeatSelection';
import { Link } from 'react-router';
import _ from 'lodash';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
import { Loading } from '@components';
import { fetchData, postData } from '@api/api.service';

const Seat = ({ seat }) => {
  return (
    <div className='relative' onClick={() => seat.toggleSelection()}>
      <div className='absolute inset-x-0 top-3 w-full flex justify-center text-gunmetal text-sm'>{seat.number}</div>
      <span className={`duration-300 ease-in-out hover:text-amethyst-hover active:text-amethyst-active ${seat.selected ? 'text-amethyst' : ''}`}><i className='material-icons'>{'chair'}</i></span>
    </div>
  );
};

const Seats = ({ seats }) => {
  return (
    <div className='text-powder text-6xl cursor-pointer text-2xl select-none space-y-2'>
      <div className='flex w-full justify-center space-x-1 relative'>
        <div className='absolute left-4 inset-y-0 flex items-center opacity-50 text-xl'>{'B'}</div>
        {_.map(_.filter(seats, { row: 'B' }), seat => <Seat key={seat.id} seat={seat}/>)}
      </div>
      <div className='flex w-full justify-center space-x-1 relative'>
        <div className='absolute left-4 inset-y-0 flex items-center opacity-50 text-xl'>{'A'}</div>
        {_.map(_.filter(seats, { row: 'A' }), seat => <Seat key={seat.id} seat={seat}/>)}
      </div>
    </div>
  );
};

const SeatPicker = ({ seats }) => {
  return (
    <div className='w-1/2 mx-auto'>
      <div className='font-serif text-3xl my-4 text-center'>{'Select Seats'}</div>
      <Seats seats={seats}/>
      <div className='mt-12 bg-slate rounded flex justify-center items-center p-4'>{'SCREEN'}</div>
    </div>
  );
};

const Showtime = ({ time, onChange }) => {
  const handleOnChange = (value) => {
    onChange(value ? dayjs().hour(value.split(':')[0]).minute(value.split(':')[1]) : '');
  };

  return (
    <div className='w-1/2 mx-auto'>
      <div className='font-serif text-3xl my-4 text-center'>{'Select Showtime'}</div>
      <div className='flex justify-center'>
        <input
          value={time ? time.format('HH:mm') : ''}
          min={dayjs().format('HH:mm')}
          onChange={e => handleOnChange(e.target.value)}
          className='mb-4 p-2 bg-slate rounded outline-none'
          type='time'
        />
      </div>
    </div>
  );
};

const SeatSelector = () => {
  const { guid } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState(dayjs().hour(20).minute(30).second(0));
  const seatSelection = useSeatSelection();

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      const response = await fetchData(`/movies/${guid}`);
      setMovie(response);
      setIsLoading(false);
    };

    if (guid) fetchMovie();
  }, [guid]);

  const submitSeats = async () => {
    await postData(
      `/movies/${guid}/play`,
      {
        seats: seatSelection.selectedSeats,
        time
      }
    );
    console.log(seatSelection.selectedSeats);
    console.log(time);
  };

  if (isLoading) return <Loading/>;

  return (
    <div className='py-16 px-8 md:px-16 lg:px-32 xl:px-64'>
      <div className='mb-4 select-none cursor-pointer'>
        <Link to='/'>
          <span className='flex items-center'>
            <i className='material-icons text-3xl'>{'chevron_left'}</i>
            {'Select Movie'}
          </span>
        </Link>
      </div>
      <div className='flex'>
        <div className='min-w-72 w-72'><img src={movie.image} alt={movie.title} className='rounded'/></div>
        <div className='ml-8 p-1'>
          <div className='text-6xl mb-8'>{movie.title}</div>
          <div className='text-2xl'>{movie.summary}</div>
        </div>
      </div>
      <div className='h-px bg-slate my-8'/>
      <SeatPicker seats={seatSelection.seats}/>
      <div className='h-px bg-slate my-8'/>
      <Showtime time={time} onChange={value => setTime(value)}/>
      <div className='h-px bg-slate my-8'/>
      <div className='flex justify-end mr-32 mt-16'>
        <button onClick={() => submitSeats()} className='select-none cursor-pointer rounded inline-flex px-4 py-2 bg-amethyst hover:bg-amethyst-hover active:bg-amethyst-active text-xl'>
          <div className='flex justify-between items-center'>
            <span>{'Print Tickets'}</span>
            <i className='material-icons text-3xl'>{'chevron_right'}</i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;
