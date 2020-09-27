import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Link, useHistory, useLocation, useRouteMatch,
} from 'react-router-dom';
import SearchForm from './search-form';

function ScrollLink({ to, children }) {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });
  const location = useLocation();
  const history = useHistory();

  const handleScrollClick = useCallback((e) => {
    e.preventDefault();

    // Remove the search params if they click on the home button.
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('search')) {
      searchParams.delete('search');

      history.replace({
        ...location,
        search: searchParams.toString(),
      });
    }

    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }, [
    history,
    location,
  ]);

  if (match) {
    return (
      <a href={to} onClick={handleScrollClick}>
        {children}
      </a>
    );
  }

  return (
    <Link to={to}>
      {children}
    </Link>
  );
}

ScrollLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Header() {
  return (
    <header className="mb-3 sticky-top">
      <div className="container">
        <div className="row">
          <div className="col-auto mb-1 mt-1 border-right">
            <ScrollLink to="/">
              <svg
                version="1.1"
                viewBox="0 0 611.999 611.999"
                width="40px"
                height="40px"
              >
                <g>
                  <path d="M602.332,513.647c-46.115-28.305-93.803-34.281-134.848-31.037c41.53-47.079,66.74-108.895,66.74-176.609 c0-147.526-119.598-267.112-267.117-267.112C119.598,38.887,0,158.475,0,305.999s119.598,267.112,267.107,267.112 c38.167,0,74.455-8.022,107.297-22.444c1.089-0.348,9.069-4.181,10.499-4.884c29.521-13.783,116.625-46.458,196.228,2.403 c9.536,5.853,22.016,2.87,27.87-6.669C614.857,531.978,611.872,519.501,602.332,513.647z M382.328,204.694 c30.304-9.847,62.848,6.732,72.684,37.029c9.843,30.298-6.74,62.837-37.034,72.684c-30.291,9.842-62.832-6.74-72.681-37.036 C335.458,247.078,352.037,214.533,382.328,204.694z M267.107,105.203c31.86,0,57.69,25.826,57.69,57.683 c0,31.854-25.83,57.68-57.69,57.68c-31.852,0-57.674-25.826-57.674-57.68C209.433,131.03,235.257,105.203,267.107,105.203z M79.217,241.723c9.839-30.294,42.377-46.877,72.681-37.031c30.294,9.839,46.87,42.385,37.025,72.677 c-9.843,30.299-42.383,46.88-72.674,37.034C85.944,304.56,69.361,272.021,79.217,241.723z M231.552,449.854 c-18.729,25.772-54.797,31.488-80.568,12.758c-25.772-18.724-31.485-54.792-12.762-80.564 c18.722-25.77,54.791-31.483,80.564-12.762C244.557,388.009,250.271,424.084,231.552,449.854z M267.107,328.862 c-12.621,0-22.862-10.234-22.862-22.863s10.24-22.863,22.862-22.863c12.631,0,22.871,10.234,22.871,22.863 S279.738,328.862,267.107,328.862z M302.672,449.854c-18.719-25.77-13.003-61.845,12.766-80.571 c25.772-18.722,61.839-13.008,80.564,12.762c18.729,25.772,13.013,61.842-12.759,80.571 C357.469,481.34,321.401,475.626,302.672,449.854z" />
                </g>
              </svg>
            </ScrollLink>
          </div>
          <div className="col">
            <SearchForm />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
