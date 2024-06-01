# Data API

## Run dev environment
```
docker compose up data-api mongo mongo-express
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
    -e DB_CONNECTION_STRING="mongodb://<user>:<password>@<db-cluster>.us-west-2.docdb-elastic.amazonaws.com:27017/regulation?tls=true&retryWrites=false" \
    data-api-deployer:latest
```

# Data Transfer Service

## Run dev environment
```
docker compose up data-transfer mongo mongo-express
```

## Build
```
docker build ./data-transfer -t data-transfer-deployer:latest
```

## Deploy to AWS Cloud
```
docker run --rm -it \
    -e SERVERLESS_ACCESS_KEY=<value> \
    -e AWS_ACCESS_KEY_ID=<value> \
    -e AWS_SECRET_ACCESS_KEY=<value> \
    -e AWS_REGION=us-west-2 \
    -e AWS_S3_BUCKET=mancomm-regulation-documents \
    -e DB_COLLECTION_NAME=regulationdocuments \
    -e DB_CONNECTION_STRING="mongodb://<user>:<password>@<db-cluster>.us-west-2.docdb-elastic.amazonaws.com:27017/regulation?tls=true&retryWrites=false" \
    data-transfer-deployer:latest
```
