import requests
import json
import sys

connector_name = "debezium-source-test"
base_url = "http://localhost:8083/connectors"
status_url = f"{base_url}/{connector_name}/status"
connector_file_path = "/etc/kafka-connect/debezium-source.json"

try:
    # Add connector if it doesn't exist
    response = requests.get(status_url)
    status = response.json()
    if response.status_code == 404:
        print(f"connector {connector_name} not found. Adding it now")
        with open(connector_file_path, 'r') as file:
            connector_json = json.load(file)
        response = requests.post(
            base_url,
            headers={"Content-Type": "application/json"},
            json=connector_json
        )
    else:
        # if it exists check tasks
        response.raise_for_status() # in case any other error exist in previous call
        should_restart = False
        for task in status["tasks"]:
            if task["state"] == "FAILED":
                print(f"Task {task['id']} is in FAILED state")
                should_restart = True
                break
        if should_restart:
            print(f"Restarting connector {connector_name}")
            response = requests.post(f"{base_url}/{connector_name}/restart?includeTasks=true&onlyFailed=true")
            response.raise_for_status()
    sys.exit(0)
except requests.exceptions.RequestException as e:
    print(f"Error checking status {e}")
    sys.exit(1)