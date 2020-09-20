const fetch = require('node-fetch');
const HttpError = require('../errors/http.js');

/**
 * Proxy The Movie Database API.
 *
 * This proxy is not necessary because The Movie Database API responds with the proper CORS headers
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin}
 * which allows the API to be read from the browser.
 *
 * It may have been wise to conceal the API Key from the client, but the company has stated it is
 * acceptable to expose the API key to the client
 * {@link https://www.themoviedb.org/talk/5b6b0e08925141406a1134de}.
 *
 * Making a direct request would be more efficient because The Movie Database API caches the API
 * responses on a CDN.
 */
async function proxyHandler({ url }) {
  if (!process.env.TMDB_API_KEY) {
    throw new HttpError(500, 'Missing TMDB_API_KEY');
  }

  const tmdbURL = new URL(url.pathname.replace(/^\/api\//, ''), 'https://api.themoviedb.org/3/');
  tmdbURL.search = url.search;
  tmdbURL.searchParams.set('api_key', process.env.TMDB_API_KEY);

  const response = await fetch(tmdbURL);
  return response.json();
}

module.exports = proxyHandler;
