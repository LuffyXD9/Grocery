const mongoose = require('mongoose')

const Grocery = new mongoose.Schema({
    item_name : String,
    item_price : Number,
})

module.exports = mongoose.model("Grocery", Grocery)