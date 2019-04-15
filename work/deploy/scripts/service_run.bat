@echo off
Pushd "%~dp0"
call env

echo Running...
plink %IP% -l %USER% -pw %PASS% bash %DEST%/run.sh
echo Done!
popd