# Data API

## Run dev environment
```
docker compose up
```

## Build
```
docker build ./data-api -t data-api-deployer:latest
```

## Deploy to AWS Cloud
```
docker run --rm -it \
    -e SERVERLESS_ACCESS_KEY=<value> \
    -e AWS_ACCESS_KEY_ID=<value> \
    -e AWS_SECRET_ACCESS_KEY=<value> \
    data-api-deployer:latest
```
