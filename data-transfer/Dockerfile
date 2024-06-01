FROM node:20-alpine

RUN apk update \
    && apk add --no-cache aws-cli \
    && yarn global add serverless typescript

RUN mkdir /app
WORKDIR /app

COPY . .

CMD ["sh", "-c", "export NODE_ENV=production && yarn install && yarn build && serverless deploy"]
