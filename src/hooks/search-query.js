import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useSearchQuery() {
  const location = useLocation();

  return useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    return searchParams.get('search') || '';
  }, [location.search]);
}

export default useSearchQuery;
