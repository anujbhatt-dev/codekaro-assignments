const Product = require("../models/product.model")

const createIndex = async () => {
    
    // single indexing
    // await Product.collection.createIndex({
    //     price:1
    // })
    // await Product.collection.dropIndex("price_1");
    
    //compound indexting
    //  await Product.collection.createIndex({
    //     price:1,
    //     title:1    
    // }) 
    // await Product.collection.dropIndex("price_1_title_1");
    
    // ttl indexing
    // await Product.collection.createIndex(
    //     { createdAt: 1 },
    //     { expireAfterSeconds: 10000000 }
    // );
    // await Product.collection.dropIndex("createdAt_1");
    
    // multikey indexing
    // await Product.collection.createIndex({
    //     category:1
    // })
    // await Product.collection.dropIndex("category_1");
}

createIndex();