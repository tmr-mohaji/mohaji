const express = require("express");
const router = express.Router();
const event = require("../controller/EventController");

router.get("/", event.getEvent);

module.exports = router;