@echo off

echo Gerando dados...
node leitura.js

echo Iniciando servidor minimizado...
start "SERVIDOR RESUMO DO ESTOQUE" /min cmd /c "node server\server.js"

timeout /t 2 > nul

echo Abrindo sistema...
start http://localhost:3000
