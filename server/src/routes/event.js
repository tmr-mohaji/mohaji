const express = require("express");
const router = express.Router();
const event = require("../controller/EventController");

router.get("/", event.getEvent);
router.get("/:id", event.getDetail);
router.get("/address", event.getAddress);

module.exports = router;