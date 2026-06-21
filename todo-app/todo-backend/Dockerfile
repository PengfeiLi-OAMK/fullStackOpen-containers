FROM node:24
  
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci 

COPY --chown=node:node . .

ENV DEBUG=todo-express-backend:*
  
USER node

# EXPOSE 3123

CMD ["node", "./bin/www"]

