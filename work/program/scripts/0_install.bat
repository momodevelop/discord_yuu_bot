@echo off
Pushd "%~dp0"

set MODULES=discord.js sprintf-js app-module-path @types/sprintf-js @types/node @types/core-js

cd ..
echo Uninstalling modules...
rmdir /S /Q node_modules
del /Q package-lock.json
del /Q package.json
call npm init -y
call npm install %MODULES%
echo Installed!

popd