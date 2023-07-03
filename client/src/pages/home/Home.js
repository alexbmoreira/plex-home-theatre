import React from 'react';
import { observer } from 'mobx-react';
import { withState } from '../../utils';
import { HomeState } from './state';
import { Link } from 'react-router-dom';

const Poster = observer(({movie}) => {
  return (
    <div key={movie.guid} className='cursor-pointer w-full rounded bg-slate hover:bg-amethyst active:bg-amethyst-active'>
      <Link to={`/select-seats/${movie.guid}`}>
        <img src={movie.image} alt={movie.title} className='w-full rounded-t'/>
        <div className='p-4 truncate rounded-b'>
          {movie.title}
        </div>
      </Link>
    </div>
  );
});

const Home = observer(({uiState}) => {
  const {movies} = uiState;

  console.log(movies);
  return (
    <div className='py-16 px-64'>
      <div className='font-serif text-3xl mb-4 text-center'>{'Select a Movie'}</div>
      <div className='grid gap-6 grid-cols-4'>
        {movies.map((movie) => <Poster movie={movie}/>)}
      </div>
    </div>
  );
});

export default withState(Home, HomeState);
