@echo off
Pushd "%~dp0"

set MODULES=app-root-path@2.2.1 lokijs@1.5.6 @types/lokijs@1.5.2 discord.js@11.4.2 typescript@3.4.3 @types/node@11.13.4 @types/core-js@2.5.0 app-module-path@2.2.0 @types/app-module-path@2.2.0 request@2.88.0 request-promise-native@1.0.7 @types/request-promise-native@1.0.15

cd ..
echo Uninstalling modules...
rmdir /S /Q node_modules
del /Q package-lock.json
del /Q package.json
call npm init -y
call npm install %MODULES%
echo Installed!

popd