import { useContext } from 'react';
import _ from 'lodash';
import { InteractiveContext } from '@contexts';

const Filter = () => {
  const {filter, filterUpdated} = useContext(InteractiveContext);

  return (
    <input
      type='search'
      className='w-full mb-4 p-4 bg-slate rounded outline-none'
      placeholder={'Search...'}
      defaultValue={_.get(filter, 'search') || ''}
      onChange={_.debounce(e => filterUpdated({ search: e.target.value }), 300)}
    />
  );
};

export default Filter;
