# Hasura Kafka POC
The aim is to demonstrate dataflow from Kafka topic to Postgres via Hasura and Azure functions

> [!NOTE]
> This is just a POC so env files are not added to gitignore

## Project Setup
### 1. Setup containers
Build the image for kafka connect
```
cd kafka-connect
docker build . -t kafka-connect-http:1.0.0
```
Run kafka, hasura, postgres with
```
docker compose up -d
```

### 2. Start azure function
Run azure function cli
```
cd azure-functions
npm run start
```
BASE URL will be http://172.17.0.1:7071/api when called from inside the container
### 3. Start hasura cli
Run hasura console cli (no admin secret set here)
```
cd hasura-metadata
hasura console --console-port 9500
```

### 3. Setup kafka connect connection
Modify the **http-sink.json** in *kafka-connect* folder
```
cd kafka-connect
curl -d @http-sink.json -H "Content-Type: application/json" -X POST http://localhost:8083/connectors
```

## Kafka UI
To create topics and messages via UI   
- Goto http://localhost:9010/   

## Running Hasura migration
Migration files for the demo are available.   
   
TBD

## OS and Versions
- Ubuntu 22.04  
- Node 16.16.0 - CHECK VERSION USED IN AZURE AND USE THAT  
- npm 8.11.0  
- Azure func cli 4.0.5907  
- Hasura cli 2.40.0  