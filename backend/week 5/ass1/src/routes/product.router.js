const { createProduct, getAllProducts, deleteProductById, updateProductById } = require("../controllers/product.controller");
const checkAuth = require("../middlewares/checkAuth.middleware");


const router = require("express").Router();

router.get("/",getAllProducts)
router.post("/",checkAuth,createProduct)
router.delete("/:id",checkAuth,deleteProductById)
router.post("/:id",checkAuth,updateProductById)

module.exports = router