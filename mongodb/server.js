const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017/images';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 10,
};

const client = new MongoClient(uri, options);

// Modify the function to accept parameters
async function connectAndInsert(documentsToInsert) {
    try {
        await client.connect();
        console.log('Connected to the database');

        // Get a reference to the database and collection
        const database = client.db('image');
        const collection = database.collection('images');

        // Insert multiple documents into the collection
        const result = await collection.insertMany(documentsToInsert);
        console.log(`${result.insertedCount} documents inserted`);

    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        // Close the connection when done
        await client.close();
        console.log('Connection pool closed');
    }
}

// Export the connectAndInsert function
module.exports = connectAndInsert;