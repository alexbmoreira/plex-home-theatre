import { useContext } from 'react';
import { Link } from 'react-router';
import { InteractiveProvider } from '@providers';
import { InteractiveContext } from '@contexts';
import { Filter } from '@components';

const Poster = ({movie}) => {
  return (
    <div key={movie.guid} className='cursor-pointer w-full rounded bg-slate duration-300 ease-in-out hover:bg-amethyst active:bg-amethyst-active'>
      <Link to={`/select-seats/${movie.guid}`}>
        <img src={movie.image} alt={movie.title} className='w-full rounded-t'/>
        <div className='p-4 truncate rounded-b'>
          {movie.title}
        </div>
      </Link>
    </div>
  );
};

const MovieList = () => {
  const {models} = useContext(InteractiveContext);

  return (
    <div className='grid gap-6 grid-cols-4'>
      {models.map((movie) => <Poster key={movie.guid} movie={movie}/>)}
    </div>
  );
};

const Movies = () => {
  return (
    <div className='py-16 px-8 md:px-16 lg:px-32 xl:px-64'>
      <div className='font-serif text-3xl mb-4 text-center'>{'Select a Movie'}</div>
      <InteractiveProvider endpoint='/movies'>
        <Filter/>
        <MovieList/>
      </InteractiveProvider>
    </div>
  );
};

export default Movies;
