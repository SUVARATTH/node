const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/images';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
};

const client = new MongoClient(uri, options);
async function data_base(documentsToInsert) {
    try {
        await client.connect();
        console.log('Connected to the database');
        const database = client.db('image');
        const collection = database.collection('images');
        const result = await collection.insertMany(documentsToInsert);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await client.close()
    }
}
async function getdata() {
    const client = new MongoClient(uri, options);
    await client.connect();

    const database = client.db('image');
    const collection = database.collection('images');

    const result = await collection.find({}).toArray();

    client.close();
    return result;
}



module.exports = { data_base, getdata }