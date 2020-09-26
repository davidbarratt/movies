import React from 'react';
import PropTypes from 'prop-types';
import useSearchQuery from '../hooks/search-query';
import SearchResults from './search-results';
import Header from './header';
import Footer from './footer';

function Layout({ children }) {
  const searchQuery = useSearchQuery();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="container d-flex flex-column flex-grow-1">
        {searchQuery ? <SearchResults /> : children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
