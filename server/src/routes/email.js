const express = require("express");
const router = express.Router();
const email = require("../controller/EmailController");

router.post("/", email.sendEmail);

module.exports = router;