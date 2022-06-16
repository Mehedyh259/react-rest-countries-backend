const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json())

const run = async () => {
    const uri = "mongodb+srv://dbuser:dbpassword@cluster0.lzekf.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


    try {
        await client.connect();
        console.log('connected db');
        const userCollection = client.db('rest-countries').collection('users');

        app.post('/user', async (req, res) => {
            const user = req?.body;
            const result = await userCollection.insertOne(user);
            res.status(201).send({ message: "succesfully inserted" })
        })
        app.get('/user', async (req, res) => {
            const email = req.query.email;

            if (email) {
                const user = await userCollection.findOne({ email: email });
                res.status(201).send({ user })
            } else {
                const user = await userCollection.find().toArray();
                res.status(201).send({ user })
            }
        })

    } finally {

    }

}
run().catch(console.dir)




app.listen(port, () => console.log('server is running'))






