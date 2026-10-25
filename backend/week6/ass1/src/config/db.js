const mongoose = require("mongoose")
require("dotenv").config();

async function connectDb() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("db connected!");
}

module.exports =connectDb