const mongo = require('mongodb')
require('dotenv').config();


const DB_URL = process.env.DB_URL;

async function DatabaseConnect(){
    try{
        const client = new mongo.MongoClient(DB_URL)
        await client.connect(DB_URL);
        console.log("Database are connected")
        return client;
    }
    catch(error){
        console.log("Database are not connected", error)
    }
}


module.exports = {DatabaseConnect};