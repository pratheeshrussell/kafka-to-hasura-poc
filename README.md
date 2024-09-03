# Hasura Kafka POC
The aim is to demonstrate data flow from Hasura to kafka via Debezium connector

> [!NOTE]
> This is just a POC so env files are not added to gitignore

## Branches
There are multiple POC in different branches
- main branch - Kafka -> kafka connect -> Azure function(http trigger) -> Hasura -> PG DB
- direct_postgres_call branch - Kafka -> kafka connect -> Azure function(http endpoint) -> PG DB
- azure_kafka_trigger branch - Kafka -> Azure function(kafka trigger) -> PG DB

## Data flow
Hasura -> Postgres DB -> Debezium -> Kafka

## Project Setup
### 1. Setup containers
> [!NOTE]
> Before building the image make necessary changes to the **debezium-source.json** in *kafka-connect* folder 

Build the image for kafka connect
```
cd kafka-connect
docker build . -t kafka-connect-debezium:1.0.0
```
Run kafka, hasura, postgres with
```
docker compose up -d
```

### 2. Start hasura cli
Run hasura console cli (no admin secret set here)
```
cd hasura-metadata
hasura console --console-port 9500
```

## Postgres setup
Check the docker compose file. The following line is required
```
command: [ "postgres", "-c", "wal_level=logical", "-c","max_replication_slots=1" ]
```
- [Enable logical decoding](https://docs.confluent.io/kafka-connectors/debezium-postgres-source/current/overview.html#enable-logical-decoding)

## Kafka UI
To create topics and messages via UI   
- Goto http://localhost:9010/   

## Running Hasura migration
Migration files for the demo are available.   
   
TBD



## OS and Versions
- Ubuntu 22.04  
- Node 18.19.1   
- npm 8.11.0  
- Azure func cli 4.0.5907  
- Hasura cli 2.40.0  