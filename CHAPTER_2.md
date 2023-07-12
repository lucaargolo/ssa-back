## 2. Visões e Indexação

### Criando nossas visões:

Para criar as nossas visões, parametrizadas para os principais campus da UFBA em Salvador, execute o `create_ocorrencia_views.js`

Ao executar essa operação, 3 views devem ser criadas:

- `ocorrenciasCanela `
- `ocorrenciasOndina`
- `ocorrenciasSaoLazaro`

![img_2.png](resources/views.png)

Para consultar ocorrências nas views criadas, execute o `consult_ocorrencia_views.js`

### Criando nossos índices:

Para criar os nossos índices, utilize o MongoDBCompass e repetindo o processo de criação já ensinado, iremos criar mais dois índices na coleção de ocorrências `ocorrencias`:

![img.png](resources/index.png)

1. Crie um índice no campo de `data_hora` do tipo `-1` (descendente)

![img_2.png](resources/index_dh.png)

2. Crie um índice composto nos campos `localizacao` e `data_hora`

![img_3.png](resources/index_cp.png)