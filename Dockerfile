# Development Stage
FROM node:18.17.0 As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

# Production Stage
FROM node:18.17.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk add --update curl && \
    rm -rf /var/cache/apk/* && \
    mkdir -p /usr/src/app && \
    chown -R node:node /usr/src/app

USER node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY --chown=node:node . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]