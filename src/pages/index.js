import React, { useReducer } from 'react';
import { mergeMap, map } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import useReactor from '@cinematix/reactor';
import Layout from '../components/layout';
import Movies from '../components/movies';

const initialState = {
  popular: [],
};

const POPULAR_SET = 'POPULAR_SET';

function reducer(state, action) {
  switch (action.type) {
    case POPULAR_SET:
      return {
        ...state,
        popular: action.payload,
      };
    default:
      throw new Error('Unkown Action');
  }
}

function popularReactor(value$) {
  return value$.pipe(
    mergeMap(() => (
      // @TODO Handle Request failures.
      fromFetch('/api/movie/popular').pipe(
        mergeMap((response) => response.json()),
        map(({ results }) => ({
          type: POPULAR_SET,
          payload: results,
        })),
      )
    )),
  );
}

function Index() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useReactor(popularReactor, dispatch, []);

  return (
    <Layout>
      <Movies list={state.popular} />
    </Layout>
  );
}

export default Index;
