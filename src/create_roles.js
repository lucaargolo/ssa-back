const { MongoClient, ObjectId } = require("mongodb")

const uri = "mongodb://luca:123456@host127.0.0.1:27017"
const client = new MongoClient(uri)

async function run() {
    try {
        const db = client.db("ssa")

        db.createRole({
            role: 'admin',
            privileges: [
                { resource: { db: 'ssa', collection: '' }, actions: ['find', 'insert', 'update', 'remove'] }
            ],
            roles: []
        });

        db.createRole({
            role: 'create',
            privileges: [
                { resource: { db: 'ssa', collection: 'users' }, actions: ['find', 'insert', 'update', 'remove'] }
            ],
            roles: []
        });

        db.createRole({
            role: 'user',
            privileges: [
                { resource: { db: 'ssa', collection: 'users' }, actions: ['find'] },
                { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find', 'insert'] }
            ],
            roles: []
        });

        db.createRole({
            role: 'guest',
            privileges: [
                { resource: { db: 'ssa', collection: 'ocorrencias' }, actions: ['find'] }
            ],
            roles: []
        });


    }finally {
        await client.close()
    }
}

run().catch(console.dir)

