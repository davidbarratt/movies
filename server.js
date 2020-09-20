require('dotenv').config();
const { join } = require('path');
const express = require('express');
const webpack = require('webpack');
const { createEngine } = require('express-react-views');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxyHandler = require('./handlers/proxy.js');
const searchHandler = require('./handlers/search.js');
const webpackConfig = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 8080;

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', createEngine());

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    index: false,
  }));
}

app.use('/dist', express.static(join(__dirname, 'dist')));

app.all(/^\/api\//, proxyHandler);
app.get('/', searchHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
