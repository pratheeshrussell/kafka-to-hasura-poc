FROM confluentinc/cp-kafka-connect:7.5.2
USER root

COPY debezium-source.json /etc/kafka-connect/debezium-source.json
COPY health_check.py /etc/kafka-connect/health_check.py
COPY debezium-debezium-connector-postgresql-2.5.4.zip /tmp/kafka-connect-debezium.zip
RUN chmod 666 /tmp/kafka-connect-debezium.zip
RUN confluent-hub install --no-prompt /tmp/kafka-connect-debezium.zip
