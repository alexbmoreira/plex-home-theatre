import React from 'react';
import { observer } from 'mobx-react';
import { withState } from '../../utils';
import { HomeState } from './state';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const Spinner = () => {
  return (
    <div className='flex justify-center items-center gap-2 mt-16'>
      <div className='w-4 h-4 rounded-full bg-amethyst animate-bounce'></div>
      <div className='w-4 h-4 rounded-full bg-amethyst animate-bounce [animation-delay:-.3s]'></div>
      <div className='w-4 h-4 rounded-full bg-amethyst animate-bounce [animation-delay:-.5s]'></div>
    </div>
  )
};

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
  const {movies, loadingMovies} = uiState;

  return (
    <div className='py-16 px-64'>
      <div className='font-serif text-3xl mb-4 text-center'>{'Select a Movie'}</div>
      <input
        type='search'
        className='w-full mb-4 p-2 bg-slate rounded outline-none'
        placeholder={'Search...'}
        onChange={_.debounce(e => uiState.updateSearch(e.target.value), 300)}
      />
      {loadingMovies ?
        <Spinner/> :
        <div className='grid gap-6 grid-cols-4'>
          {movies.map((movie) => <Poster movie={movie}/>)}
        </div>
      }
    </div>
  );
});

export default withState(Home, HomeState);
