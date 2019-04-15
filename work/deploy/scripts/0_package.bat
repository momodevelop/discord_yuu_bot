@echo off
Pushd "%~dp0"

@echo Packaging...

@SET PROGRAM_PATH=..\..\program
@SET PACKAGE_PATH=..\package
@SET CONTROL_PATH=..\control
@SET CONFIG_PATH=..\config

rmdir %PACKAGE_PATH% /s /q
mkdir %PACKAGE_PATH%
mkdir %PACKAGE_PATH%\src
mkdir %PACKAGE_PATH%\node_modules


xcopy /S /Y %PROGRAM_PATH%\out %PACKAGE_PATH%\src /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %PROGRAM_PATH%\node_modules %PACKAGE_PATH%\node_modules /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %CONTROL_PATH% %PACKAGE_PATH% /EXCLUDE:package_exclude_list.txt
xcopy /S /Y %CONFIG_PATH% %PACKAGE_PATH%\src /EXCLUDE:package_exclude_list.txt

popd