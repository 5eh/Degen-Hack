import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://watsonlewrod1:3PzmMan6BsdLMAdH@cluster0.mqv1u8z.mongodb.net/?retryWrites=true&w=majority';
if (!uri) {
    throw new Error("MongoDB URI is not defined in the environment variables.");
}

async function submitFormHandler(req, res) {
    if (req.method === "POST") {
        const { name, location, service, description, price, email, wallet } = req.body;
        const client = new MongoClient(uri);
        const dbName = "Listings";
        const collectionName = "Listings_001";

        try {
            await client.connect();
            const database = client.db(dbName);
            const collection = database.collection(collectionName);

            const doc = { name, location, service, description, price, email, wallet };
            const result = await collection.insertOne(doc);
            res.status(200).json({ message: "Document inserted", id: result.insertedId });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to insert document" });
        } finally {
            await client.close();
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

export default submitFormHandler;