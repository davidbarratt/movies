import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchForm from './search-form';
import useSearchQuery from '../hooks/search-query';
import SearchResults from './search-results';
import { Message } from '@wikimedia/react.i18n';

function Layout({ children }) {
  const searchQuery = useSearchQuery();

  return (
    <div className="d-flex flex-column min-vh-100">
      <header className="mb-3 sticky-top">
        <div className="container">
          <div className="row">
            <div className="col-auto mb-1 mt-1 border-right">
              <Link to="/">
                {/* @TODO Put the icon attribution somewhere https://www.flaticon.com/free-icon/movie-roll_72279 */}
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
              </Link>
            </div>
            <div className="col">
              <SearchForm />
            </div>
          </div>
        </div>
      </header>
      <main className="container flex-grow-1">
        {searchQuery ? <SearchResults /> : children}
      </main>
      <footer>
        <div className="container">
          <div className="row mb-3">
            <div className="col-2">
              <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.42 35.52">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <path className="cls-1" d="M191.85,35.37h63.9A17.67,17.67,0,0,0,273.42,17.7h0A17.67,17.67,0,0,0,255.75,0h-63.9A17.67,17.67,0,0,0,174.18,17.7h0A17.67,17.67,0,0,0,191.85,35.37ZM10.1,35.42h7.8V6.92H28V0H0v6.9H10.1Zm28.1,0H46V8.25h.1L55.05,35.4h6L70.3,8.25h.1V35.4h7.8V0H66.45l-8.2,23.1h-.1L50,0H38.2ZM89.14.12h11.7a33.56,33.56,0,0,1,8.08,1,18.52,18.52,0,0,1,6.67,3.08,15.09,15.09,0,0,1,4.53,5.52,18.5,18.5,0,0,1,1.67,8.25,16.91,16.91,0,0,1-1.62,7.58,16.3,16.3,0,0,1-4.38,5.5,19.24,19.24,0,0,1-6.35,3.37,24.53,24.53,0,0,1-7.55,1.15H89.14Zm7.8,28.2h4a21.66,21.66,0,0,0,5-.55A10.58,10.58,0,0,0,110,26a8.73,8.73,0,0,0,2.68-3.35,11.9,11.9,0,0,0,1-5.08,9.87,9.87,0,0,0-1-4.52,9.17,9.17,0,0,0-2.63-3.18A11.61,11.61,0,0,0,106.22,8a17.06,17.06,0,0,0-4.68-.63h-4.6ZM133.09.12h13.2a32.87,32.87,0,0,1,4.63.33,12.66,12.66,0,0,1,4.17,1.3,7.94,7.94,0,0,1,3,2.72,8.34,8.34,0,0,1,1.15,4.65,7.48,7.48,0,0,1-1.67,5,9.13,9.13,0,0,1-4.43,2.82V17a10.28,10.28,0,0,1,3.18,1,8.51,8.51,0,0,1,2.45,1.85,7.79,7.79,0,0,1,1.57,2.62,9.16,9.16,0,0,1,.55,3.2,8.52,8.52,0,0,1-1.2,4.68,9.32,9.32,0,0,1-3.1,3A13.38,13.38,0,0,1,152.32,35a22.5,22.5,0,0,1-4.73.5h-14.5Zm7.8,14.15h5.65a7.65,7.65,0,0,0,1.78-.2,4.78,4.78,0,0,0,1.57-.65,3.43,3.43,0,0,0,1.13-1.2,3.63,3.63,0,0,0,.42-1.8A3.3,3.3,0,0,0,151,8.6a3.42,3.42,0,0,0-1.23-1.13A6.07,6.07,0,0,0,148,6.9a9.9,9.9,0,0,0-1.85-.18h-5.3Zm0,14.65h7a8.27,8.27,0,0,0,1.83-.2,4.67,4.67,0,0,0,1.67-.7,3.93,3.93,0,0,0,1.23-1.3,3.8,3.8,0,0,0,.47-1.95,3.16,3.16,0,0,0-.62-2,4,4,0,0,0-1.58-1.18,8.23,8.23,0,0,0-2-.55,15.12,15.12,0,0,0-2.05-.15h-5.9Z" />
                    </g>
                  </g>
                </svg>
              </a>
            </div>
            <div className="col-10">
              <Message
                id="footer-attribution-tmdb"
                placeholders={[
                  <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer"><Message id="tmdb" /></a>,
                  <a href="https://developers.themoviedb.org/" target="_blank" rel="noreferrer"><Message id="tmdb-api" /></a>,
                ]}
              />
              <br />
              <Message
                id="footer-attribution-flaticon"
                placeholders={[
                  <a href="https://www.flaticon.com/authors/freepik" target="_blank" rel="noreferrer">Freepik</a>,
                  <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noreferrer">www.flaticon.com</a>,
                ]}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
