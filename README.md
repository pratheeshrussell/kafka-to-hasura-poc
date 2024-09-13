# Hasura Kafka POC
The aim is to demonstrate dataflow from Kafka topic to Postgres via Red panda connect (Benthos) pipeline

> [!NOTE]
> This is just a POC so env files are not added to gitignore

## Data flow
Kafka -> red_panda_connect pipeline -> pg db

## Project Setup
### 1. Setup containers
Run all containers
```
docker compose up -d
```

### 2. Start hasura cli
Run hasura console cli (no admin secret set here)
```
cd hasura-metadata
hasura console --console-port 9500
```

## Kafka UI
To create topics and messages via UI   
- Goto http://localhost:9010/   

## Running Hasura migration
Migration files for the demo are available.   
   
TBD

## Message Format
For the demo the message sent to kafka should be a json with key **quote**
```json
{
	"quote": "quote 1"
}
```


## OS and Versions
- Ubuntu 22.04  
- Node 18.19.1   
- npm 8.11.0  
- Azure func cli 4.0.5907  
- Hasura cli 2.40.0  