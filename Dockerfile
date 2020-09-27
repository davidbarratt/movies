FROM node:lts-alpine

COPY . /app

WORKDIR /app

ENV PORT="80" TMDB_API_KEY="" TMDB_DIRECT=""

RUN npm ci; \
  npm run build;

EXPOSE 80

CMD ["npm", "--production", "start"]
