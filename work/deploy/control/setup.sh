#!/bin/sh

echo "Setting up database"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
DB_FOLDER=$DIR/../db/

mkdir DB_FOLDER