import { useState, useEffect, useCallback } from 'react';
import Url from 'domurl';
import { fetchData } from '@api/api.service';
import { InteractiveContext } from '@contexts';

const constructUrl = (endpoint, filter) => {
  const url = new Url(endpoint, true);

  url.query['filter[search]'] = filter.search;

  return url.toString();
};

const InteractiveProvider = ({ endpoint, children }) => {
  const [models, setModels] = useState([]);
  const [filter, setFilter] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchModels = useCallback(async (currentFilter = filter) => {
    if (!endpoint) return;

    setIsLoading(true);
    const url = constructUrl(endpoint, currentFilter);
    const models = await fetchData(url);
    setModels(models);
    setIsLoading(false);
  }, [endpoint, filter]);

  const filterUpdated = useCallback(async (newFilter) => {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
    await fetchModels(updatedFilter);
  }, [filter, fetchModels]);

  useEffect(() => {
    fetchModels();
  }, [endpoint, fetchModels]);

  return (
    <InteractiveContext.Provider value={{ models, filter, isLoading, filterUpdated }}>
      {children}
    </InteractiveContext.Provider>
  );
};

export default InteractiveProvider;
