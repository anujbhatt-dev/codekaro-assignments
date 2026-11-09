const express = require("express");
const { getUsers } = require("../controllers/product.controller");
const router = new express.Router()

router.get("/",getUsers);

module.exports = router