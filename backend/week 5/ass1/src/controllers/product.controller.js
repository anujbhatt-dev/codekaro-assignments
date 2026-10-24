const Product = require("../models/product.model");
const { getUser } = require("../services/auth.service");

async function createProduct(req,res){
    const {name,description,price,imageUrl} = req.body;
    const newProduct = await Product.create({name,description,price,imageUrl});
    res.status(201).json({status:"success",data:newProduct});
}

async function getAllProducts(req,res) {
    const newProduct = await Product.find({});
    res.status(201).json({status:"success",data:[...newProduct]});
}

async function updateProductById(req,res) {
    await Product.findByIdAndUpdate(req.params.id,{...req.body});
    res.status(200).json({status:"success",message:"updation successful!"})
}

async function deleteProductById(req,res) {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({status:"success",message:"deletion successful!"})
}

module.exports = {createProduct, getAllProducts, updateProductById, deleteProductById}