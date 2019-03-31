#!/bin/sh

uid=`forever list | grep discord-yuu-bot.js | cut -c24-27`
forever stop $uid
