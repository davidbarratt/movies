import { fromFetch } from 'rxjs/fetch';

function tmdbFetch(path) {
  // If the API key is exposed to the client, make the request directly.
  if (process.env.TMDB_API_KEY) {
    const url = new URL(path, 'https://api.themoviedb.org/3/');
    url.searchParams.set('api_key', process.env.TMDB_API_KEY);
    return fromFetch(url);
  }

  // Make a request through the proxy.
  return fromFetch(`/api/${path}`);
}

export default tmdbFetch;
