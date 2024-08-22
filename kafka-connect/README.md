# Kafka HTTP Sink connect

## build the image 
```
docker build . -t kafka-connect-http:1.0.0
```

## To modify
Modify the following in http-sink.json
- topics or topics.regex 
- http.url

## Add the connector definition
```
curl -d @http-sink.json -H "Content-Type: application/json" -X POST http://localhost:8083/connectors
```
To confirm if it is added you can run the following command
```
curl -X GET http://localhost:8083/connectors/http-sink-test
```
To remove the connection
```
curl -X DELETE http://localhost:8083/connectors/http-sink-test
```

## Build the connector
Refer ![Create_connector_zip file](Create_connector_zip.md)