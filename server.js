const express = require('express');
const mongoose = require('mongoose');
const Grocery = require('./models/Grocery');

const app = express();
const PORT = 5000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Grocery');

app.get('/grocery', async (req, res) => {
    try {
        const data = await Grocery.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/grocery', async (req, res) => {
    console.log(req.body);

    try {
        const { item_name, item_price } = req.body;

        if (!item_name || !item_price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const grocery = new Grocery({ item_name, item_price });
        const newGrocery = await grocery.save();

        res.status(200).json(newGrocery);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
