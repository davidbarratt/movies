import React, { useCallback, useContext } from 'react';
import {
  useLocation,
  useHistory,
} from 'react-router-dom';
import { BananaContext } from '@wikimedia/react.i18n';
import useSearchQuery from '../hooks/search-query';

function handleSubmit(e) {
  e.preventDefault();
}

function SearchForm() {
  const banana = useContext(BananaContext);
  const location = useLocation();
  const history = useHistory();

  const handleChange = useCallback((e) => {
    const searchParams = new URLSearchParams(location.search);
    if (e.target.value) {
      searchParams.set('search', e.target.value);
    } else {
      searchParams.delete('search');
    }

    history.replace({
      ...location,
      search: searchParams.toString(),
    });
  }, [
    location,
    history,
  ]);

  const searchQuery = useSearchQuery();

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <label htmlFor="search" className="input-group-text text-primary bg-transparent border-0 p-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </label>
        </div>
        <input
          type="text"
          autoComplete="off"
          name="search"
          id="search"
          className="form-control bg-transparent text-primary border-0"
          placeholder={banana.i18n('search-ellipsis', banana.i18n('search'), banana.i18n('ellipsis'))}
          aria-label={banana.i18n('search')}
          onChange={handleChange}
          value={searchQuery}
        />
      </div>
    </form>
  );
}

export default SearchForm;
