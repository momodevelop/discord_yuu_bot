@echo off
Pushd "%~dp0"
call env

echo Running...
plink %IP% -l %USER% -pw %PASS% bash %DEST%/src/run.sh
echo Done!
popd