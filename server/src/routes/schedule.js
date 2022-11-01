const express = require("express");
const router = express.Router();
const schedule = require("../controller/ScheduleController");

router.post("/addEvent", schedule.postEvent);
router.get("/getEvent", schedule.getEvent);
router.post("/deleteEvent", schedule.deleteEvent);

module.exports = router;