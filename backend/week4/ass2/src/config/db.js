const { connect } = require("mongoose");
require("dotenv").config()

const connectDB = () => connect(process.env.MONGO_URI).then(()=>{
    console.log("db connected!");
}) 

module.exports = connectDB;