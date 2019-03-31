@echo off
Pushd "%~dp0"

call env
echo Stopping...
call plink %IP% -l %USER% -pw %PASS% bash %DEST%/src/stop.sh
echo Done!
popd