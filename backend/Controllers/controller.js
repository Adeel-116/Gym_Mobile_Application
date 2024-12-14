const { createCollection } = require('../models/Scheme');

async function insertQuery({username, email, password}) {
    const data = {username, email, password}
    try {
        const collection = await createCollection();
        if (!collection) {
            throw new Error("Failed to retrieve collection");
        }
        const result = await collection.insertOne(data); // Insert the data object into the collection
        console.log('Data inserted successfully with ID:', result.insertedId);
    } catch (error) {
        console.error('Error the data is duplicate');
    }
}


module.exports = {insertData : insertQuery}
