## 3. Otimização

Para testar o impacto dos nossos índices em consultas, utilizaremos novamente o MongoDBCompass, para fazer um explain visual das operações de busca.

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

Para testar o antes e depois do índice composto nos campos `localizacao` e `data_hora` utilize a seguinte query:

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

Caso seja necessário deletar um índice para a execução do teste, isso pode ser feito na página de criação de índices.

![img_12.png](resources/remove_idx.png)

Após clicar para remover o índice e confirmar sua remoção, o teste pode ser reexecutado.

**Importante:**

Quando o índice composto for criado, é possível que o MongoDB demore algum tempo até decidir começar a usá-lo (Pode ser minutos ou até horas). Para motivos de testes, recomendamos que delete o índice `localizacao_2dsphere` no campo `localizacao` para forçar o Mongo a usar o índice composto.
