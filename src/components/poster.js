import React from 'react';
import PropTypes from 'prop-types';
import usePosterBaseUrl from '../hooks/poster-url';

function Poster({ path, alt }) {
  const posterBaseUrl = usePosterBaseUrl();

  if (!posterBaseUrl) {
    return null;
  }

  if (!path) {
    return null;
  }

  return (
    <img src={posterBaseUrl + path} alt={alt} className="w-100" />
  );
}

Poster.propTypes = {
  path: PropTypes.string,
  alt: PropTypes.string,
};

Poster.defaultProps = {
  path: undefined,
  alt: undefined,
};

export default Poster;
