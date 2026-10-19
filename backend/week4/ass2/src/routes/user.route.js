const express = require("express");
const { createUser, getUserById, getUserByIdAndUpdate, getUserByIdAndDelete } = require("../controllers/user.controller");
const router = express.Router();

router.route("/").post(createUser);
router.route("/:id").get(getUserById);
router.route("/:id").patch(getUserByIdAndUpdate);
router.route("/:id").delete(getUserByIdAndDelete);


module.exports = router