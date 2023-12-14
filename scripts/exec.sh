#!/bin/bash

# Function to check file existence with both .yaml and .yml extensions
check_compose_file() {
    if [ -e "$1/docker-compose.yaml" ]; then
        echo "$1/docker-compose.yaml"
    elif [ -e "$1/docker-compose.yml" ]; then
        echo "$1/docker-compose.yml"
    else
        echo ""
    fi
}

DOCKER_COMPOSE_FILE=""
COMMAND=""

# Function to display help
display_help() {
    echo "Usage: $0 [--f | -file] [docker-compose-file-path] {sh|shell}"
    echo
    echo "Options:"
    echo "  --f, -file  Specify the path to the Docker Compose file. If not provided, the script searches the current and parent directories."
    echo "  -help, --h  Display this help message."
    echo
    echo "Commands:"
    echo "  sh - Run a sh shell in the 'app' service using Docker Compose."
    exit 1
}

# Process each argument
while [[ $# -gt 0 ]]; do
    arg="$1"
    case $arg in
        --f)
            DOCKER_COMPOSE_FILE=$(check_compose_file "$2")
            shift # Remove --f
            shift # Remove value
            ;;
        -file)
            DOCKER_COMPOSE_FILE=$(check_compose_file "$2")
            shift # Remove -file
            shift # Remove value
            ;;
        -help|--h)
            display_help
            ;;
        *)
            COMMAND="$1" # Save the command
            shift # Remove command
            ;;
    esac
done

# If no file flag is used, check current and parent directory
if [ -z "$DOCKER_COMPOSE_FILE" ]; then
    DOCKER_COMPOSE_FILE=$(check_compose_file "${PWD}") || $(check_compose_file "${PWD%/*}")
fi

# Exit if no Docker Compose file is found
if [ -z "$DOCKER_COMPOSE_FILE" ]; then
    echo "docker-compose file not found"
    exit 1
fi

# Check for Docker Compose command availability
if command -v docker compose &> /dev/null; then
    DOCKER_COMMAND="docker compose"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMMAND="docker-compose"
else
    echo "Neither docker compose nor docker-compose are available."
    exit 1
fi

# Execute the command
case "$COMMAND" in
    sh)
        $DOCKER_COMMAND -f "$DOCKER_COMPOSE_FILE" exec app sh
        ;;
    *)
        display_help
        ;;
esac
