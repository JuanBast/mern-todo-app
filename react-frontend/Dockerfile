FROM node:13.10.1-stretch

ENV NODE_ENV=production

WORKDIR /app

#COPY package.json package-lock.json ./

COPY . .

WORKDIR /app/frontend

RUN npm install && npm cache clean --force

ENV PATH /app/frontend/node_modules/.bin/:$PATH

EXPOSE 3000
# CMD ["node", "server.js"]

# CMD [ "node", "./src/index.js" ]
CMD ["npm", "start"]