# Movies
A simple movie website.

## Quickstart

### Development
 1. Copy `.env.dist` to `.env` and customize by adding a `TMDB_API_KEY` which can be obtained at https://www.themoviedb.org/settings/api
 2. `npm install`
 3. `npm start`
 4. Open browser and navigate to http://localhost:8080

### Production
 1. Copy `.env.dist` to `.env` and customize by adding a `TMDB_API_KEY` which can be obtained at https://www.themoviedb.org/settings/api
 2. `npm install`
 3. `npm run build`
 4. `npm --production start`
 5. Open browser and navigate to http://localhost:8080

### Docker
 1. Get a `TMDB_API_KEY` at https://www.themoviedb.org/settings/api
 1. `docker build . --tag movies`
 2. `docker run -p 8888:80 -e TMDB_API_KEY=YOURAPIKEY movies`
 5. Open browser and navigate to http://localhost:8888
