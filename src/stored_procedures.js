async function atualizar_localizacao_usuario(db, user_id, latitude, longitude) {
    let users = db.collection("users")
    let user = await users.findOne({ _id: user_id})

    if(user) {
        console.log("Atualizando localização de "+user.nome+" "+user.sobrenome+" ("+user.email+")")

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
        );
    }else {
        console.log("Não foi possível encontrar um usuário ("+user_id+")")
    }
}