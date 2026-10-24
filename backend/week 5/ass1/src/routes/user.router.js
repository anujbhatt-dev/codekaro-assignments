const { registerUser, getAllUser, login } = require("../controllers/user.controller");

const router = require("express").Router();

router.post("/register",registerUser)
router.post("/login",login)
router.get("/",getAllUser);

module.exports = router