# Estudo de Caso com NoSQL (MongoDB)

## Pré requisitos

Pré requisitos para execução dos nossos códigos:

- Git (https://git-scm.com/downloads)
- Node.js e NPM (https://nodejs.org/en/download)

Para clonar o repositório utilize o seguinte comando:

`git clone https://github.com/lucaargolo/ssa-back.git`

Com o reposítorio clonado, vá para a pasta `ssa-back` e execute o comando `npm install` para instalar os pacotes necessários.

Com os pacotes do node já instalados, vá para a pasta `/src` (onde os códigos estão guardados) utilizando o comando `cd src`

Para executar os códigos utilize o seguinte comando `node ./nome_do_arquivo.js`

Exemplo: `node ./populate_users.js`

## Passo a passo

Para executar todos os códigos e testes feitos durante a disciplina por favor siga a documentação a seguir em ordem:

- [Instação e Configuração do MongoDB](INSTALL.md) (Processo de instalação do MongoDB, criação do banco de dados, criação das coleções, criação do índice geoespacial)
- [Modelagem e Mapeamento](CHAPTER_1.md) (Modelagem das nossas coleções, executando scripts para preencher as coleções, executando consultas nas coleções)
- [Visões e Indexação](CHAPTER_2.md) (Criando visões, executando consultas nas visões, criação de índice simples e índice composto)
- [Otimização](CHAPTER_3.md) (Utilizando explain do MongoDBCompass para testar a otimização gerada pela criação dos índices)
- [Stored Procedures e Triggers](CHAPTER_4.md) (Apresentação e explicação sobre o uso de stored procedures no mongo, exemplo de uma atlas function)
- [Transações](CHAPTER_5.md) (Configurando um set de replicação simples e executando transação para inserção de ocorrência)
- [Controle de Usuário](CHAPTER_6.md) (Criação de cargos, criação de usuários e configuração da autenticação no MongoDB)
- [Auditoria e Segurança](CHAPTER_7.md) (Apresentação e explicação sobre o uso de auditoria e segurança no mongo, exemplo de configuração para auditoria)
- [Backup e Recuperação](CHAPTER_8.md) (Execução de backup completo do banco e execução de recuperação completa do banco)
 