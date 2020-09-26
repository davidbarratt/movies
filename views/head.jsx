const React = require('react');
const { Message } = require('@wikimedia/react.i18n');

function Index() {
  return (
    <head>
      <title><Message id="sitename" /></title>
      <link rel="stylesheet" href="/dist/styles/global.css" />
      <script src="/dist/main.js" type="text/javascript" async />
    </head>
  );
}

module.exports = Index;
