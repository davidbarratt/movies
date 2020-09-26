import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';
import Poster from './poster';

function MovieLink({ id, children }) {
  return (
    <Link to={`/movie/${id}`}>
      {children}
    </Link>
  );
}

MovieLink.propTypes = {
  id: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

function PosterImage({ id, path, alt }) {
  if (!path) {
    return null;
  }

  return (
    <MovieLink id={id}>
      <Poster path={path} alt={alt} />
    </MovieLink>
  );
}

PosterImage.propTypes = {
  id: PropTypes.number.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string,
};

PosterImage.defaultProps = {
  path: undefined,
  alt: undefined,
};

function Movie({
  id, title, posterPath, releaseDate,
}) {
  const release = releaseDate ? DateTime.fromISO(releaseDate) : undefined;
  const date = release ? release.toLocaleString(DateTime.DATE_MED) : undefined;

  return (
    <li className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-3">
      <div className="card flex-grow-1">
        <PosterImage id={id} path={posterPath} alt={title} />
        <div className="card-body">
          <h5 className="card-title"><MovieLink id={id}>{title}</MovieLink></h5>
          <p>{date}</p>
        </div>
      </div>
    </li>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  posterPath: PropTypes.string,
  releaseDate: PropTypes.string,
};

Movie.defaultProps = {
  title: undefined,
  posterPath: undefined,
  releaseDate: undefined,
};

/**
 * Grid of Movies based on a result list.
 */
function Movies({ list }) {
  return (
    <div className="row">
      <div className="col">
        <ol className="list-unstyled row">
          {list.map(({
            id, title, poster_path: posterPath, release_date: releaseDate,
          }) => (
            <Movie
              key={id}
              id={id}
              title={title}
              posterPath={posterPath}
              releaseDate={releaseDate}
            />
          ))}
        </ol>
      </div>
    </div>
  );
}

Movies.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  })),
};

Movies.defaultProps = {
  list: [],
};

export default Movies;
