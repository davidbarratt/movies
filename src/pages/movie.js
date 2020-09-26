import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import useReactor from '@cinematix/reactor';
import { merge } from 'rxjs';
import {
  mergeMap, switchMap, map,
} from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';
import { DateTime } from 'luxon';
import { Message } from '@wikimedia/react.i18n';
import Layout from '../components/layout';
import Middle from '../components/middle';
import Poster from '../components/poster';

const MOVIE_SET = 'MOVIE_SET';
const CREDITS_SET = 'CREDITS_SET';

const initialState = {
  movie: {},
  cast: [],
  crew: [],
};

function reducer(state, action) {
  switch (action.type) {
    case MOVIE_SET:
      return {
        ...state,
        movie: action.payload,
      };
    case CREDITS_SET:
      return {
        ...state,
        cast: action.payload.cast || [],
        crew: action.payload.crew || [],
      };
    default:
      throw new Error('Unknown Action');
  }
}

function reactor(value$) {
  return value$.pipe(
    switchMap(([id]) => (
      // @TODO Handle errors and 404s
      merge(
        fromFetch(`/api/movie/${id}`).pipe(
          mergeMap((response) => response.json()),
          map((data) => ({
            type: MOVIE_SET,
            payload: data,
          })),
        ),
        fromFetch(`/api/movie/${id}/credits`).pipe(
          mergeMap((response) => response.json()),
          map((data) => ({
            type: CREDITS_SET,
            payload: data,
          })),
        ),
      )
    )),
  );
}

function Cast({ list }) {
  if (list.length === 0) {
    return null;
  }

  return (
    <div className="row">
      <div className="col">
        <table className="table table-dark">
          <caption><h4><Message id="cast" /></h4></caption>
          <thead>
            <tr>
              <th className="w-50" scope="col"><Message id="name" /></th>
              <th className="w-50" scope="col"><Message id="character" /></th>
            </tr>
          </thead>
          <tbody>
            {list.map(({ credit_id: id, name, character }) => (
              <tr key={id}>
                <th className="w-50" scope="row">{name}</th>
                <td className="w-50">{character}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Cast.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    credit_id: PropTypes.string.isRequired,
    name: PropTypes.string,
    character: PropTypes.string,
  })),
};

Cast.defaultProps = {
  list: [],
};

function Crew({ list }) {
  if (list.length === 0) {
    return null;
  }

  return (
    <div className="row mb-3">
      <div className="col">
        <table className="table table-dark">
          <caption><h4><Message id="crew" /></h4></caption>
          <thead>
            <tr>
              <th className="w-50" scope="col"><Message id="name" /></th>
              <th className="w-50" scope="col"><Message id="job" /></th>
            </tr>
          </thead>
          <tbody>
            {list.map(({ credit_id: id, name, job }) => (
              <tr key={id}>
                <th className="w-50" scope="row">{name}</th>
                <td className="w-50">{job}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

Crew.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    credit_id: PropTypes.number.isRequired,
    name: PropTypes.string,
    job: PropTypes.string,
  })),
};

Crew.defaultProps = {
  list: [],
};

function Movie() {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);

  useReactor(reactor, dispatch, [id]);

  if (state.movie.success === false) {
    return (
      <Layout>
        <Middle>
          <h2 className="text-center">{state.movie.status_message}</h2>
        </Middle>
      </Layout>
    );
  }

  if (!state.movie.id) {
    return (
      <Layout />
    );
  }

  const release = state.movie.release_date ? DateTime.fromISO(state.movie.release_date) : undefined;
  const year = release ? release.toFormat('yyyy') : undefined;
  const releaseDate = release ? release.toLocaleString(DateTime.DATE_SHORT) : undefined;

  // @TODO Make the i18n of this better.
  const genres = state.movie.genres ? state.movie.genres.map(({ name }) => name).join(', ') : undefined;
  const duration = state.movie.runtime ? `${state.movie.runtime}m` : undefined;

  const meta = [releaseDate, genres, duration].filter((m) => !!m).join(' — ');

  return (
    <Layout>
      <div className="row">
        <div className="col-12 col-sm-3 mb-3">
          <Poster path={state.movie.poster_path} alt={state.movie.title} />
        </div>
        <div className="col mb-3">
          <h1>
            {state.movie.title}
            <span> </span>
            <small className="text-secondary">{year ? `(${year})` : undefined}</small>
          </h1>
          <p>{meta}</p>
          <p>{state.movie.overview}</p>
        </div>
      </div>
      <Cast list={state.cast} />
      <Crew list={state.crew} />
    </Layout>
  );
}

export default Movie;
