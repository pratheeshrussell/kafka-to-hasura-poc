# Creating the http connector zip

In this demo the zip is provided however you can build the files from source if you require a different version

## Build the connector from source 
Download the code from [http-connector-for-apache-kafka](https://github.com/Aiven-Open/http-connector-for-apache-kafka) and build it.

```
./gradlew clean check distTar distZip
```
- This will generate a zip file under **build/distributions/**. However this zip cannot be used directly since there is no manifest file. 
- extract the jar files from zip.
- add them to a folder lib and add manifest file
- some naming conventions are needed check [reference links](#refer)

## REFER
* [kafka-connect-http plugin](https://github.com/clescot/kafka-connect-http) this didn't work however we can use it as a reference to get the manigest file   
* [Install connector](https://docs.confluent.io/platform/current/connect/devguide.html#create-an-archive)  
* [Archive format](https://docs.confluent.io/platform/current/connect/confluent-hub/component-archive.html)  
