## 6. Controle de Usuário

Os códigos a seguir, para o controle de usuário, devem ser executados no Mongo Shell.

![img_15.png](resources/mongosh.png)

Os códigos devem ser executados no banco de administração do Mongo. Para isso, utilize o comando.

`use admin`

![img_16.png](resources/use_admin.png)

### Criando cargos:

Ao executar os comandos a seguir, os mesmos deverão retornar o seguinte acknowledgement:

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
