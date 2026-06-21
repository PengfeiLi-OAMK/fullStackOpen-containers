FROM node:24
  
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm install 

COPY --chown=node:node . .

ENV DEBUG=todo-express-backend:*
  
USER node

CMD ["npm","run","dev"]