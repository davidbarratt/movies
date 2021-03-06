require('dotenv').config();
const { join } = require('path');
const express = require('express');
const webpack = require('webpack');
const { createEngine } = require('express-react-views');
const webpackDevMiddleware = require('webpack-dev-middleware');
const proxyHandler = require('./handlers/proxy.js');
const appHandler = require('./handlers/app.js');
const webpackConfig = require('./webpack.config.js');

const app = express();
const port = process.env.PORT || 8080;

/**
 * @TODO It would be simpler to use {@link https://nextjs.org/ Next.js} or {@link https://flareact.com/ Flareact} for
 * all of this. There is a ton of boilerplate configuration that could be handle for us.
 */

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
app.get('*', appHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});
