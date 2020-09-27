FROM node:lts-alpine

COPY . /app

WORKDIR /app

ARG TMDB_API_KEY=""
ARG TMDB_DIRECT=""

ENV PORT="80"
ENV TMDB_API_KEY ${TMDB_API_KEY}
ENV TMDB_DIRECT ${TMDB_DIRECT}

RUN npm ci; \
  npm run build;

EXPOSE 80

CMD ["npm", "--production", "start"]
