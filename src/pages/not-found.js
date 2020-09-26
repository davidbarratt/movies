import { Message } from '@wikimedia/react.i18n';
import React from 'react';
import Middle from '../components/middle';
import Layout from '../components/layout';

function NotFound() {
  return (
    <Layout>
      <Middle>
        <h2 className="text-center"><Message id="not-found" /></h2>
      </Middle>
    </Layout>
  );
}

export default NotFound;
