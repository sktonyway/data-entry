import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGODB_URI);

async function run() {
    await client.connect();
    const db = client.db("dataentry");
    const employees = db.collection("employees1");

    // POST route for saving form data
    app.post("/api/employees", async (req, res) => {
        try {
            await employees.insertOne(req.body);
            res.status(200).json({ message: "Saved successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }
    });
    app.get("/api/employees", async (req, res) => {
        try {
            const allEmployees = await employees.find({}).toArray();
            res.status(200).json(allEmployees);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Database error" });
        }
    });


    app.listen(5000, () => console.log("Server running on http://localhost:5000"));
}
run();
