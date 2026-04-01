@echo off
echo Running npm install...
call npm install 2>&1
echo Exit code: %ERRORLEVEL%
dir /b node_modules 2>&1 | find /c /v "" > count.txt
echo Done.
pause
