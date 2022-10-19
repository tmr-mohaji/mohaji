const express = require("express");
const router = express.Router();
const user = require("../controller/UserController");

router.post("/signup", user.postSignup);

module.exports = router;