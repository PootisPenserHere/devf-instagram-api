#!/bin/sh
# wait-for-mongo.sh

apk add --no-cache --virtual .wait-for-it mongodb

until mongo --host mongo:27017; do
  >&2 echo "Mongo is unavailable - sleeping"
  sleep 1
done

>&2 echo "Mongo is up"

apk del .wait-for-it