@echo off

Pushd "%~dp0"

cd..
echo Removing out folder...
rmdir /S /Q out
echo Compiling...
call tsc
echo Compiled!

popd