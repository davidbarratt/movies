import React from 'react';
import Layout from '../components/layout';

function NotFound() {
  return (
    <Layout>
      <div className="row">
        <div className="col">
          <h1 className="text-center">404</h1>
          <h3 className="text-center">Not Found</h3>
        </div>
      </div>
    </Layout>
  );
}

export default NotFound;
