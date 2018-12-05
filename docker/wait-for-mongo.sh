#!/bin/sh

set -e

host="$1"
shift
cmd="$@"

apk add --no-cache --virtual .wait-for-it mongodb

until mongo --host "$host:27017"; do
  >&2 echo "Mongo is unavailable - sleeping"
  sleep 1
done

>&2 echo "Mongo is up - executing command"

apk del .wait-for-it

exec $cmd

