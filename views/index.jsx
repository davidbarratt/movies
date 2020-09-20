const React = require('react');

function Index() {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/dist/styles/global.css" />
        <script src="/dist/main.js" type="text/javascript" async />
      </head>
      <body>
        <div id="root">
          {/* @TODO Render the React App on the Server. */}
        </div>
      </body>
    </html>
  );
}

module.exports = Index;
