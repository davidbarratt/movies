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
 2. `docker build -t movies .`
    - If you wish to use the TMDB API directly from the client, modify this command to:
      `docker build --build-arg TMDB_API_KEY=YOURAPIKEY --build-arg TMDB_DIRECT=1 -t movies .`
 3. `docker run -p 8888:80 -e TMDB_API_KEY=YOURAPIKEY movies`
 4. Open browser and navigate to http://localhost:8888
