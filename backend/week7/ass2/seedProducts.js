
const mongoose = require("mongoose");
const Product = require("./models/product.model");

require("./config/db");

const count = Number(process.argv[2]);

const categories = ["Electronics", "Clothing", "Books", "Furniture", "Sports"];

const seedProducts = async () => {
    try {
       

        const products = Array.from({ length: count }, (_, i) => ({
            title: `Product ${i + 1}`,
            description: `Description for product ${i + 1}`,
            price: Math.floor(Math.random() * 10000) + 100,
            category: [
                categories[Math.floor(Math.random() * categories.length)]
            ]
        }));

        await Product.insertMany(products);

        console.log(`${count} products inserted successfully`);

        await mongoose.disconnect();
    } catch (error) {
        console.log(error);
        await mongoose.disconnect();
    }
};

seedProducts();
