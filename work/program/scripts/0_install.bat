@echo off
Pushd "%~dp0"

set MODULES=app-root-path lokijs @types/lokijs discord.js typescript @types/node @types/core-js app-module-path @types/app-module-path request request-promise-native @types/request-promise-native

cd ..
echo Uninstalling modules...
rmdir /S /Q node_modules
del /Q package-lock.json
del /Q package.json
call npm init -y
call npm install %MODULES%
echo Installed!

popd