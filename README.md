# Estudo de Caso com NoSQL (MongoDB)

## Instalação e Configuração

## Indices

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
    "type": 'Point',
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

Para consultar ocorrencias nas views criadas, execute o `consult_ocorrencia_views.js` 

### Criando nossos indices:

## 3. Otimização


## 4. Stored Procedures e Triggers

Como as Atlas Functions (Stored Procedures do MongoDB) são exclusivas da plataforma cloud (MongoDB Atlas), incluimos apenas um exemplo de como seria uma procedure para atualizar a localização de um usuário. 

Esse exemplo pode ser encontrado em `stored_procedures.js`, mas não pode ser executado.

## 5. Transações

Para executar uma transação que cria uma ocorrência a partir de um usuário aleatorio, e tenta atualizar a localização do usuário antes de criar a ocorrência, execute o `create_ocorrencia_transaction.js`

Observação: Para testar a transação em caso de falha, descomente a linha 53.

## 6. Controle de Usuário

Os códigos a seguir, para o controle de usuário, devem ser executados no Mongo Shell.

### Criando cargos:

```js
db.createRole({
    role: 'admin',
    privileges: [
        { resource: { db: 'ssa', collection: '' }, actions: ['find', 'insert', 'update', 'remove'] }
    ],
    roles: []
});
```
```js
db.createRole({
    role: 'create',
    privileges: [
        { resource: { db: 'ssa', collection: 'users' }, actions: ['find', 'insert', 'update', 'remove'] }
    ],
    roles: []
});
```
```js
db.createRole({
    role: 'user',
    privileges: [
        { resource: { db: 'ssa', collection: 'users' }, actions: ['find'] },
        { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find', 'insert'] }
    ],
    roles: []
});
```
```js
db.createRole({
    role: 'guest',
    privileges: [
        { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find'] }
    ],
    roles: []
});
```

### Criando usuários:

```js
db.createUser({
    user: 'luca',
    pwd: '123456',
    roles: ["admin"]
});
```

```js
db.createUser({
    user: 'caio',
    pwd: '123456',
    roles: ["guest"]
});
```

### Ativando a autenticação no MongoDB

Para ativar a autenticação no MongoDB, as instâncias do `mongod` devem ser iniciadas com `--auth`

A partir desse momento, só será possível conectar no banco modificando a Connection String.<br>
Exemplo: `mongodb://luca:123456@host127.0.0.1:27017`

## 7. Auditoria e Segurança

## 8. Backup e Recuperação