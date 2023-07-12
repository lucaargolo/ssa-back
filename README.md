# Estudo de Caso com NoSQL (MongoDB)

## Instalação e Configuração

Aqui está uma instrução principal para instalar o MongoDB, o MongoDB Compass, além de algumas operações básicas como conectar MongoCompass, bem como criar o banco de dados "ssa" e as coleções "users" e "ocorrencias".

**1. Instalando MongoDB:**

Siga as etapas a seguir para instalar o MongoDB:

**Windows:**

- Vá para a [página de downloads do MongoDB](https://www.mongodb.com/download-center/community).

- Selecione o sistema operacional apropriado no menu suspenso.

- Escolha o pacote de "Download msi". Em seguida, faça o download.

- Execute o instalador que foi baixado.

- Siga as instruções na configuração.

**Linux:**

- Abra um terminal.

- Atualize o sistema operacional com `sudo apt-get update`.

- Instale o MongoDB com `sudo apt-get install -y mongodb`.

**2. Instalando MongoDB Compass:**

- Navegue até a [página de downloads do Compass](https://www.mongodb.com/download-center/compass).

- Escolha a versão mais recente e o sistema operacional apropriado.

- Clique no botão de download.

- Após o download, abra o instalador e siga as instruções.

**3. Iniciando o banco:**

**Windows:**

- Crie uma pasta onde os dados do banco serão guardados.
- Vá para o local onde o MongoDB foi instalado (por padrão "C:\Program Files\MongoDB\Server\6.0\bin")
- Abra o terminal na pasta onde o MongoDB foi instalado e execute o seguinte comando:</br>`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "pasta"`
- No nosso caso, o comando executado foi:</br>`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "C:\Users\Luca\Documents\mongo-data"`

**Linux:**

- Crie uma pasta onde os dados do banco serão guardados.
- Abra o terminal e execute o seguinte comando:</br>`mongod --bind_ip 127.0.0.1 --port 27017 --dbpath "pasta"`

**4. Conectando ao MongoDB através do Compass:**

- Abra o MongoDB Compass.
- Na janela de nova conexão que aparece, verifique que o ip e porta estão corretos, e em seguida clique em conectar.

![img.png](resources/connect.png)

**5. Criando um banco de dados e coleções:**

- Na interface do MongoDB Compass, clique em "Create". Isso abrirá um popup.

![img.png](resources/create.png)

- Digite "ssa" como o nome do banco de dados.
- Digite "users" como o nome da primeira coleção.
- Clique em "Create Database".

![img_1.png](resources/create_db.png)


- O banco de dados "ssa" agora deve estar visível na lista de bancos de dados.
- Clique nele para ver as coleções. Deveria haver uma coleção chamada "users".
- Para criar uma nova coleção chamada "ocorrencias", clique em "Create Collection".

![img_2.png](resources/collection.png)

- Digite "ocorrencias" como o nome da coleção e clique em "Create".

![img_3.png](resources/collection_oc.png)

**6. Indice Geoespacial**

Para realizar operações de busca em pontos de localização das ocorrencias, um indice geoespacial deve ser obrigatoriamente criado.

- Abra a janela da coleção de ocorrências, navegue para a aba de indices e clique em Create Index.
![img.png](resources/index.png)
- Configure o campo do indice para `localizacao` e o tipo do indice para `2dsphere`. Por fim clique em criar indice.
![img_1.png](resources/index_2d.png)

Pronto, o banco está configurado e já deverá ser possível executar os codigos.


## 1. Modelagem e Mapeamento

### Estrutura da nossas coleções:

 - Coleção de Usuários

```json
{
    "_id": { "$oid": "..." },
    "nome": "Luca",
    "sobrenome": "Argolo",
    "curso": "Ciência da Computação",
    "email": "luca.argolo@ufba.br",
    "senha": "MATB09-2023.1",
    "imagem_perfil": {
      "nome": "avatar.png",
      "conteudo": {
        "$binary": {
          "base64": "...",
          "subType": "00"
        }
      }
    },
    "localizacao": {
      "posicao": {
        "type": "Point",
        "coordinates": [-12.9999483, -38.5073694]
      },
      "data_atualizacao": { "$date": "2023-03-14T17:16:16.674Z" }
    },
    "notificar_para": "Todos",
    "receber_notificacao": "Amigos",
    "amigos_ids": [
      { "$oid": "..." }
    ]
}
```

- Coleção de Ocorrências

```json
{
  "_id": { "$oid": "..." },
  "usuario_id": { "$oid": "..." },
  "localizacao": {
    "type": "Point",
    "coordinates": [-12.9999483, -38.5073694]
  },
  "data_hora": { "$date": "2023-03-14T17:16:16.674Z" },
  "notificar_para": "Amigos",
  "lista_de_amigos": [
    { "$oid": "..." },
    { "$oid": "..." }
  ]
}
```

### Populando as coleções:

1. Para popular a coleção de usuários, execute o `populate_users.js`. Ele irá preencher a coleção de usuários com 1000 usuários gerados aleatoriamente.
    <br><br>
    Exemplo de usuário gerado:
    ```json
    {
      "_id": { "$oid": "64a76e07c7eafbb4bad8bdb9" },
      "nome": "Anabela",
      "sobrenome": "Vasconcelos",
      "curso": "Bacharelado em Matemática",
      "email": "anabela.vasconcelos@ufba.br",
      "senha": "eyh462e3fw",
      "imagem_perfil": null,
      "localizacao": null,
      "notificar_para": "Todos",
      "receber_notificacao": "Amigos",
      "amigos_ids": [
        { "$oid": "64a76e07c7eafbb4bad8bdb8" }
      ]
    }
    ```
   Observação: Os usuários gerados não possuem imagem de perfil, nem localização.
   <br><br>
2. Para popular a coleção de usuários, execute o `populate_ocorrencias.js`. Ele irá preencher a coleção de ocorrencias com 10000 ocorrências geradas aleatoriamente.
   <br><br>
   Exemplo de ocorrência gerada:
    ```json
    {
      "_id": { "$oid": "64a76f598c1a78703cff8c63" },
      "usuario_id": { "$oid": "64a76e07c7eafbb4bad8c033" },
      "localizacao": {
        "type": "Point",
        "coordinates": [-13.050030787220411, -38.46806309110932]
      },
      "data_hora": { "$date": "2023-03-14T17:16:16.674Z" },
      "notificar_para": "Amigos",
      "lista_de_amigos": [
        { "$oid": "64a76e07c7eafbb4bad8c02e" },
        { "$oid": "64a76e07c7eafbb4bad8bf4a" },
        { "$oid": "64a76e07c7eafbb4bad8be0a" }
      ]
    }
    
    ```
   Observação: Esse processo pode demorar um pouco.

### Algumas consultas:

1. Para consultar os dados de um usuário aleatório, execute o `get_random_user.js`

2. Para consultar os dados de um usuário, e dos seus amigos, a partir de um email, execute o `consult_users.js` e informe o email a ser consultado.

3. Para consultar ocorrências a até 1km de distância da latitude -13.0014756 e longitude -38.5082636, execute o `consult_ocorrencia.js`

## 2. Visões e Indexação

### Criando nossas visões:

Para criar as nossas visões, parametrizadas para os principais campus da UFBA em Salvador, execute o `create_ocorrencia_views.js`

Ao executar essa operação, 3 views devem ser criadas:

- ocorrenciasCanela 
- ocorrenciasOndina
- ocorrenciasSaoLazaro

![img_2.png](resources/views.png)

Para consultar ocorrencias nas views criadas, execute o `consult_ocorrencia_views.js` 

### Criando nossos indices:

Para criar os nossos índices, utilize o MongoDBCompass e repetindo o processo de criação já ensinado, iremos criar mais dois índices na coleção de ocorrências:

1. Crie um índice no campo de data_hora do tipo -1 (descendente)

![img_2.png](resources/index_dh.png)

2. Crie um índice composto nos campos localizacao e data_hora

![img_3.png](resources/index_cp.png)

## 3. Otimização

Para testar o impacto dos nossos indices em consultas, utilizaremos novamente o MongoDBCompass, para fazer um explain visual das operações de busca.

![img_4.png](resources/explain.png)

Para testar o antes e depois do índice no campo de data_hora utilize a seguinte query: 

```js
{data_hora: {$lt: ISODate("2022-03-29T19:08:17.386+00:00")}}
```

![img_5.png](resources/query_dh.png)

**Antes da indexação:**

![img_11.png](resources/before_dh.png)

**Depois da indexação:**

![img_6.png](resources/after_dh.png)

Para testar o antes e depois do índice composto nos campos localizacao e data_hora utilize a seguinte query:

```js
{
    localizacao: { $near: {
        $geometry: { type: 'Point', coordinates: [-13.0014756, -38.5082636 ]},
        $maxDistance: 5000
    }},
    data_hora: {$lt: ISODate("2022-03-29T19:08:17.386+00:00")}
}
```

![img_7.png](resources/query_cp.png)

**Antes da indexação:**

![img_9.png](resources/before_cp.png)

**Depois da indexação:**

![img_8.png](resources/after_cp.png)

**Observação:**

Caso seja necessário deletar um índice para a execução do teste, isso pode ser feito na página de criação de indices.

![img_12.png](resources/remove_idx.png)

Após clicar para remover o índice e confirmar sua remoção, o teste pode ser reexecutado.

**Importante:**

Quando o índice composto for criado, é possível que o MongoDB demore algum tempo até decidir começar a usa-lo (Pode ser minutos ou até horas). Para motivos de testes recomendamos que delete o índice 2dsphere no campo localizacao para forçar o Mongo a usar o índice composto.


## 4. Stored Procedures e Triggers

Como as Atlas Functions (Stored Procedures do MongoDB) são exclusivas da plataforma cloud (MongoDB Atlas), incluimos apenas um exemplo de como seria uma procedure para atualizar a localização de um usuário. 

Esse exemplo pode ser encontrado em `stored_procedures.js`, mas não pode ser executado.

## 5. Transações

Para poder utilizar transações no mongodb, a replicação deve está ativada. Para isso, encerre a instancia do banco e reinicie ela usando o parametro `--replSet rs0`

Nosso comando para iniciar o banco ficará da seguinte forma:

`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "C:\Users\Luca\Documents\mongo-data" --replSet rs0`

Após reiniciar o banco, será preciso reconectar o MongoDBCompass fazendo uma conexão direta.

![img_13.png](resources/direct_conn.png)

Com o Compass conectado, será preciso iniciar o set de replicação. Para isso é preciso abrir o MongoSH (Mongo Shell) e executar o comando `rs.initiate()`

![img_14.png](resources/rp_initiate.png)

Para executar uma transação que cria uma ocorrência a partir de um usuário aleatorio, e tenta atualizar a localização do usuário antes de criar a ocorrência, execute o `create_ocorrencia_transaction.js`

Observação: Para testar a transação em caso de falha, descomente a linha 53.

## 6. Controle de Usuário

Os códigos a seguir, para o controle de usuário, devem ser executados no Mongo Shell.

![img_15.png](resources/mongosh.png)

Os códigos devem ser executados no banco de administração do Mongo. Para isso, utilize o comando.

`use admin`

![img_16.png](resources/use_admin.png)

### Criando cargos:

Os comandos a seguir devem retornar um json de acknowledgement:

![img_17.png](resources/ack.png)

Criando cargo `admin` que possui acesso de read e write para todas as coleções.
```js
db.createRole({
    role: 'admin',
    privileges: [
        { resource: { db: 'ssa', collection: '' }, actions: ['find', 'insert', 'update', 'remove'] },
        { resource: { db: 'ssa', collection: 'users' }, actions: ['find', 'insert', 'update', 'remove'] },
        { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find', 'insert', 'update', 'remove'] }
    ],
    roles: []
})
```
Criando cargo `create` que possui acesso de read e write para a coleção de usuários.
```js
db.createRole({
    role: 'create',
    privileges: [
        { resource: { db: 'ssa', collection: 'users' }, actions: ['find', 'insert', 'update', 'remove'] }
    ],
    roles: []
})
```
Criando cargo `user` que possui acesso de read para a coleção de usuário e read e write (apenas insert) para a coleção de ocorrências.
```js
db.createRole({
    role: 'user',
    privileges: [
        { resource: { db: 'ssa', collection: 'users' }, actions: ['find'] },
        { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find', 'insert'] }
    ],
    roles: []
})
```
Criando cargo `guest` que possui acesso de read para a coleção de ocorrências.
```js
db.createRole({
    role: 'guest',
    privileges: [
        { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find'] }
    ],
    roles: []
})
```

### Criando usuários:

Criando usuário `luca` com senha `123456` com o cargo admin.
```js
db.createUser({
    user: 'luca',
    pwd: '123456',
    roles: ["admin"]
});
```
Criando usuário `caio` com senha `123456` com o cargo guest.
```js
db.createUser({
    user: 'caio',
    pwd: '123456',
    roles: ["guest"]
});
```

### Ativando a autenticação no MongoDB

Para ativar a autenticação no MongoDB, as instâncias do `mongod` devem ser iniciadas com `--auth`.

Para facilitar o processo de autenticação, é necessário desligar a replicação.

Nosso comando para iniciar o banco ficará da seguinte forma:

`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "C:\Users\Luca\Documents\mongo-data" --auth`

A partir desse momento, só será possível conectar no banco modificando a Connection String.<br>
Exemplo: `mongodb://luca:123456@127.0.0.1:27017`

![img_18.png](resources/auth_conn.png)

## 7. Auditoria e Segurança

As ferramentas de auditoria e segurança se encontram apenas disponíveis na versão enterprise do MongoDB, logo não conseguimos testar as mesmas.

Caso fosse possível ter acesso a versão enterprise, poderiamos ativar a auditoria utilizando os seguintes parametros:

- `--auditDestination file` Seta o destino da auditoria para um arquivo.
- `--auditFormat JSON ` Configura o tipo de arquivo para JSON.
- `--auditPath "C:\Users\Luca\Documents\mongo-data\audit.json` Configura a pasta de output do arquivo de auditoria.

Nosso comando para iniciar o banco ficaria da seguinte forma:

`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "C:\Users\Luca\Documents\mongo-data" --auth --auditDestination file --auditFormat JSON --auditPath data/db/auditLog.json`


## 8. Backup e Recuperação

Para facilitar o processo de backup e recuperação, é necessário desligar a autenticação.

Nosso comando para iniciar o banco ficará da seguinte forma:

`./mongod.exe --bind_ip 127.0.0.1 --port 27017 --dbpath "C:\Users\Luca\Documents\mongo-data"`

Faremos o backup e recuperação a partir do utilitário `mongodump`

Para isso, é preciso fazer o download das [ferramentas de linha de comando do MongoDB.](https://www.mongodb.com/try/download/database-tools)

Caso seja necessário é possível seguir o [tutorial oficial de instalação das ferramentas de linha de comando.](https://www.mongodb.com/docs/database-tools/installation/installation/)

Com as ferramentas já instaladas.

### Fazendo Backup

**Windows:**

- Crie uma pasta onde os dados do banco serão guardados.
- Vá para o local onde o MongoDB Command Line Tools foi instalado (por padrão "C:\Program Files\MongoDB\Tools\100\bin")
- Abra o terminal na pasta onde o MongoDB Command Line Tools foi instalado e execute o seguinte comando:</br>`./mongodump.exe --uri "mongodb://localhost:27017" --gzip -d ssa --out "pasta"`
- No nosso caso, o comando executado foi:</br>`./mongodump.exe --uri "mongodb://localhost:27017" --gzip -d ssa --out "C:\Users\Luca\Documents\mongo-backup"`

**Linux:**

- Crie uma pasta onde os dados do banco serão guardados.
- Abra o terminal e execute o seguinte comando:</br>`mongodump --uri "mongodb://localhost:27017" --gzip -d ssa --out "pasta"`

![img_19.png](resources/mongodump.png)

### Fazendo Restauração

**Windows:**

- Vá para o local onde o MongoDB Command Line Tools foi instalado (por padrão "C:\Program Files\MongoDB\Tools\100\bin")
- Abra o terminal na pasta onde o MongoDB Command Line Tools foi instalado e execute o seguinte comando:</br>`./mongorestore.exe --uri "mongodb://localhost:27017" --gzip "pasta/ssa" -d ssa`
- No nosso caso, o comando executado foi:</br>`./mongorestore.exe --uri "mongodb://localhost:27017" --gzip "C:\Users\Luca\Documents\mongo-backup\ssa" -d ssa`

**Linux:**

- Abra o terminal e execute o seguinte comando:</br>`mongorestore --uri "mongodb://localhost:27017" --gzip "pasta/ssa" -d ssa`

Para demonstração, fizemos a restauração para um banco auxiliar que chamamos de `ssa_res`.

Utilizamos o seguinte comando: 

`./mongorestore.exe --uri "mongodb://localhost:27017" --gzip "C:\Users\Luca\Documents\mongo-backup\ssa" -d ssa_res`

![img_20.png](resources/mongorestore.png)

**Resultado:**

![img_21.png](resources/ssa_pre_res.png)

![img_22.png](resources/ssa_aft_res.png)

