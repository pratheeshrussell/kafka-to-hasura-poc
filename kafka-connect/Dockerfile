FROM confluentinc/cp-kafka-connect:7.5.2
USER root
# No idea why this is needed
# ENV jmx_exporter_version=0.19.0
# ENV CONNECT_LOG4J_APPENDER_STDOUT_LAYOUT_CONVERSIONPATTERN="[%d] %p %X{connector.name}|%X{connector.scope}%X{connector.task} %m (%c:%L)%n"
# RUN curl -s -L https://repo1.maven.org/maven2/io/prometheus/jmx/jmx_prometheus_javaagent/${jmx_exporter_version}/jmx_prometheus_javaagent-${jmx_exporter_version}.jar -o /tmp/jmx_prometheus_javaagent.jar;
# main step
COPY http-sink.json /etc/kafka-connect/http-sink.json
COPY health_check.py /etc/kafka-connect/health_check.py
COPY spr-http-connector-for-apache-kafka-0.8.0-SNAPSHOT.zip /tmp/kafka-connect-http.zip
RUN chmod 666 /tmp/kafka-connect-http.zip
RUN confluent-hub install --no-prompt /tmp/kafka-connect-http.zip
# no idea why this is needed
# COPY kafka-connect.yml /tmp/kafka-connect.yml
# USER appuser