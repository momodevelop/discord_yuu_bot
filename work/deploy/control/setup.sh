#!/bin/sh

echo "Setting up database"
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

DB_DIR=$DIR/db

if [ ! -d $DB_DIR ]; then 
	mkdir $DB_DIR;
fi