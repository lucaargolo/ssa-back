const { MongoClient, ObjectId} = require("mongodb")

const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri, {
    directConnection: true
})

async function atualizar_localizacao_usuario_with_session(db, session, user_id, latitude, longitude) {
    let users = db.collection("users")
    let user = await users.findOne({ _id: user_id}, { session })

    if(user) {
        await users.updateOne(
            { _id: user_id },
            { $set: {
                'localizacao': {
                    'posicao': {
                        'type': "Point",
                        'coordinates': [latitude, longitude]
                    },
                    "data_atualizacao": new Date()
                }
            } },
            { session }
        );
    }else {
        throw "Não foi possível encontrar um usuário ("+user_id+")"
    }
}

async function createOcorrencia(db, session, user_id) {


    const ocorrencias = db.collection("ocorrencias")

    //Simulando uma request da nova localização do usuario
    let new_latitude = -13.0014756 + (((Math.random() * 10) - 5)/100.0)
    let new_longitude =  -38.5082636 + (((Math.random() * 10) - 5)/100.0)
    await atualizar_localizacao_usuario_with_session(db, session, user_id, new_latitude, new_longitude)

    const users = db.collection("users")
    let user = await users.findOne({ _id: user_id}, { session })

    const ocorrencia = {
        usuario_id: new ObjectId(user_id),
        localizacao: user.localizacao.posicao,
        data_hora: new Date(),
        notificar_para: "Amigos",
        lista_de_amigos: user.amigos_ids,
    };

    return await ocorrencias.insertOne(ocorrencia, { session })
}

async function run() {
    try {
        const db = client.db("ssa")
        const users = db.collection("users")
        let user = await users.aggregate([
            { "$sample": {"size": 1} }
        ]).next()
        let user_id = user["_id"]

        const session = client.startSession()
        const transactionOptions = {
            readPreference: 'primary',
            readConcern: { level: 'local' },
            writeConcern: { w: 'majority' }
        }

        try {
            await session.withTransaction(async () => {
                let insert = await createOcorrencia(db, session, user_id)
                console.log(insert)
            }, transactionOptions)
        } catch (e) {
            console.error("transação abortada: ", e)
        } finally {
            await session.endSession()
        }

    }finally {
        await client.close()
    }
}

run().catch(console.dir)