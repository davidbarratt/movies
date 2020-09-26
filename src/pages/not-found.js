import React from 'react';
import Layout from '../components/layout';

function NotFound() {
  return (
    <Layout>
      <div className="row flex-grow-1">
        <div className="col align-self-center">
          <h2 className="text-center">Page Not Found</h2>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
