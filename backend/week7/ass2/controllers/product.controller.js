const Product = require("../models/product.model")

require("../services/createIndexing");

const getUsers = async(req,res) =>{
    const products = await Product.find({...req.query})
    .explain("executionStats")
    res.status(200).json({data:products,count:products.length})
}

module.exports = {getUsers}