FROM node:13.10.1-stretch

ENV NODE_ENV=production

WORKDIR /app

COPY . .

WORKDIR /app/backend

# COPY package.json package-lock.json ./

RUN npm install && npm cache clean --force

ENV PATH /app/backend/node_modules/.bin/:$PATH

EXPOSE 6200

CMD ["node", "server.js"]