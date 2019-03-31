@echo off
Pushd "%~dp0"

call env
cd..

echo Deploying...
plink %IP% -l %USER% -pw %PASS% rm -rf %DEST%; mkdir %DEST%;
pscp -r -pw %PASS% %SRC%/** %USER%@%IP%:%DEST%

echo Deployed!
popd