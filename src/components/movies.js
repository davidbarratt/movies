import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import usePosterBaseUrl from '../hooks/poster-url';

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
  const posterBaseUrl = usePosterBaseUrl();

  if (!posterBaseUrl) {
    return null;
  }

  if (!path) {
    return null;
  }

  return (
    <MovieLink id={id}>
      <img src={posterBaseUrl + path} alt={alt} className="w-100" />
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

/**
 * Grid of Movies based on a result list.
 */
function Movies({ list }) {
  return (
    <div className="row">
      <div className="col">
        <ol className="list-unstyled row">
          {list.map(({ id, title, poster_path: posterPath }) => (
            <li key={id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex mb-3">
              <div className="card flex-grow-1">
                <PosterImage id={id} path={posterPath} alt={title} />
                <div className="card-body">
                  <h5 className="card-title"><MovieLink id={id}>{title}</MovieLink></h5>
                </div>
              </div>
            </li>
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
  })),
};

Movies.defaultProps = {
  list: [],
};

export default Movies;
