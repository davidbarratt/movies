require('dotenv').config();
const { createServer } = require('http');
const proxyHandler = require('./src/handlers/proxy.js');
const HttpError = require('./src/errors/http.js');

async function router(req) {
  const url = new URL(req.url, `http://${req.headers.host}`);

  const event = {
    url,
  };

  if (url.pathname.match(/^\/api\//)) {
    return proxyHandler(event);
  }

  throw new HttpError(404, 'Not Route Found');
}

async function requestListener(req, res) {
  let data;
  let statusCode = 200;

  try {
    data = await router(req, res);
  } catch (e) {
    statusCode = e.statusCode || 500;
    data = {
      message: e.message,
    };
  }

  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
  }).end(JSON.stringify(data));

  return res;
}

const server = createServer(requestListener);
const port = process.env.PORT || 8080;
server.listen(port);

// eslint-disable-next-line no-console
console.log(`Server started at http://localhost:${port}`);
