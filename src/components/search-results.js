import React, { useReducer } from 'react';
import { of, concat } from 'rxjs';
import {
  debounceTime, switchMap, mergeMap, map,
} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import useReactor from '@cinematix/reactor';
import useSearchQuery from '../hooks/search-query';
import Movies from './movies';

const RESET = 'RESET';
const RESULT_SET = 'RESULT_SET';
const STATUS_SET = 'STATUS_SET';
const STATUS_READY = 'ready';
const STATUS_FETCHING = 'fetching';
const STATUS_DONE = 'done';

const initialState = {
  status: STATUS_READY,
  results: [],
};

function reducer(state, action) {
  switch (action.type) {
    case RESET:
      return initialState;
    case RESULT_SET:
      return {
        ...state,
        results: action.payload,
        status: STATUS_DONE,
      };
    case STATUS_SET:
      return {
        ...state,
        status: action.status,
      };
    default:
      throw new Error('Unknown Action');
  }
}

function reactor(value$) {
  return value$.pipe(
    debounceTime(250),
    switchMap(([searchQuery]) => {
      if (!searchQuery) {
        return of({ type: RESET });
      }

      const url = new URL('/api/search/movie', window.location);
      url.searchParams.set('query', searchQuery);

      return concat(
        of({
          type: STATUS_SET,
          payload: STATUS_FETCHING,
        }),
        fromFetch(url).pipe(
          mergeMap((result) => result.json()),
          map(({ results }) => ({
            type: RESULT_SET,
            payload: results,
          })),
        ),
      );
    }),
  );
}

function SearchResults() {
  const searchQuery = useSearchQuery();
  const [state, dispatch] = useReducer(reducer, initialState);

  useReactor(reactor, dispatch, [searchQuery]);

  if (!searchQuery) {
    return null;
  }

  // @TODO Add a loading indicator

  if (state.status === STATUS_DONE && state.results.length === 0) {
    return (
      <div className="row flex-grow-1">
        <div className="col align-self-center">
          <h2 className="text-center">No Results</h2>
        </div>
      </div>
    );
  }

  return (
    <Movies list={state.results} />
  );
}

export default SearchResults;
