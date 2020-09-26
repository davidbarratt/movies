const React = require('react');
const { IntlProvider } = require('@wikimedia/react.i18n');
const en = require('../i18n/en.json');
const Head = require('./head.jsx');

function Index() {
  // @TODO Support more languages
  const messages = {
    en,
  };

  const locale = 'en';

  return (
    <IntlProvider messages={messages} locale={locale}>
      <html lang={locale}>
        <Head />
        <body>
          <div id="root">
            {/* @TODO Render the React App on the Server. */}
          </div>
        </body>
      </html>
    </IntlProvider>
  );
}

module.exports = Index;
