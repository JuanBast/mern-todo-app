FROM node:13.10.1-stretch

EXPOSE 6200

ENV NODE_ENV=production
ENV PATH /app/backend/node_modules/.bin/:$PATH

WORKDIR /app

RUN chown -R node:node .

COPY --chown=node:node ./backend/package.json ./backend/package-lock.json ./backend/

USER node

WORKDIR /app/backend

RUN npm install && npm cache clean --force

COPY --chown=node:node . .

CMD ["node", "server.js"]