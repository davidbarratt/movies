import React from 'react';
import PropTypes from 'prop-types';

function Middle({ children }) {
  return (
    <div className="row flex-grow-1">
      <div className="col align-self-center">
        {children}
      </div>
    </div>
  );
}

Middle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Middle;
