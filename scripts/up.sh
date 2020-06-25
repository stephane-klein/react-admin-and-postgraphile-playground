#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../"

docker-compose up -d postgres
./scripts/wait-service.sh postgres 5432

./scripts/load-seed.sh
./scripts/load-fixtures.sh

docker-compose up -d
