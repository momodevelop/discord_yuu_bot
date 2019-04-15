@echo off
Pushd "%~dp0"

call env

cd..

@SET BACKUP_SRC=%DEST%/db/discord-yuu-bot.json
@SET BACKUP_DEST=%TMP%/discord-yuu-bot.json

echo Deploying...
call plink %IP% -l %USER% -pw %PASS% mkdir %TMP%; mv %BACKUP_SRC% %BACKUP_DEST%; rm -rf %DEST%; mkdir %DEST%;
call pscp -r -pw %PASS% %SRC%/** %USER%@%IP%:%DEST%
call plink %IP% -l %USER% -pw %PASS% mv %BACKUP_DEST% %BACKUP_SRC%; rm -rf %TMP%; bash %DEST%/src/setup.sh;
echo Deployed!
popd