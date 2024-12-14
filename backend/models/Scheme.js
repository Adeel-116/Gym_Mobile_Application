const { DatabaseConnect } = require('../db');

async function createCollection() {
    try {
        const client = await DatabaseConnect();
        const db = client.db("gym_App");
        const collection =  await db.createCollection("Signup_data20", {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["username", "email", "password"],
                    properties: {
                        username: {
                            bsonType: "string",
                            description: "Username must be a string with a minimum length of 3"
                        },
                        email: {
                            bsonType: "string",
                            description: "Email must be a valid email address"
                        },
                        password: {
                            bsonType: "string",
                            minLength: 8,
                            description: "Password must be at least 8 characters long, and contain a number and a special character"
                        },
                    }
                }
            }
        });
        await collection.createIndex({ email: 1 }, { unique: true });
        console.log("Collection created successfully");
        return db.collection("Signup_data20");
    } catch (error) {
        console.error("Error creating collection:", error);

    }
}


module.exports={createCollection}