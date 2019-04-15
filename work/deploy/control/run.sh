#!/bin/sh

SCRIPT=`readlink -f "$0"`
SCRIPTPATH=$(dirname "$SCRIPT")

cd $SCRIPTPATH/src

forever start ./discord-yuu-bot.js

