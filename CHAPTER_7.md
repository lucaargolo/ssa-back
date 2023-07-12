## 7. Auditoria e Segurança

As ferramentas de auditoria e segurança se encontram apenas disponíveis na versão enterprise do MongoDB, logo não conseguimos testar as mesmas.

Caso fosse possível ter acesso a versão enterprise, poderíamos ativar a auditoria utilizando os seguintes parâmetros:

- `--auditDestination file` Seta o destino da auditoria para um arquivo.
- `--auditFormat JSON ` Configura o tipo de arquivo para JSON.
- `--auditPath "C:\Users\Luca\Documents\mongo-data\audit.json` Configura a pasta de output do arquivo de auditoria.

Nosso comando para iniciar o banco ficaria da seguinte forma:

`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "C:\Users\Luca\Documents\mongo-data" --auth --auditDestination file --auditFormat JSON --auditPath data/db/auditLog.json`

