const express = require("express");
const router = express.Router();
const review = require("../controller/ReviewController");

router.post("/writeComment", review.writeComment);

module.exports = router;