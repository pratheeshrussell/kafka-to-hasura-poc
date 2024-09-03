# Kafka HTTP Sink connect

## build the image 
```
docker build . -t kafka-connect-debezium:1.0.0
```

## To modify
Modify the following in http-sink.json
- topics or topics.regex 
- http.url

## Add the connector definition
Here we add the connector definition via the health_check py
### To add connector definition manually
```
curl -d @debezium-source.json -H "Content-Type: application/json" -X POST http://localhost:8083/connectors
```
To confirm if it is added you can run the following command
```
curl -X GET http://localhost:8083/connectors/debezium-source-test
```
To remove the connection
```
curl -X DELETE http://localhost:8083/connectors/debezium-source-test
```
To check status
```
curl -X GET http://localhost:8083/connectors/debezium-source-test/status
```
To restart the tasks
```
curl -X POST http://localhost:8083/connectors/debezium-source-test/restart?includeTasks=true&onlyFailed=true
```

## Download the connector
You can download the zip from [Debezium PostgreSQL Connector](https://www.confluent.io/hub/debezium/debezium-connector-postgresql)