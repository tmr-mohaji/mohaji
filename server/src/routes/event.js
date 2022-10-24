const express = require("express");
const router = express.Router();
const event = require("../controller/EventController");

//router.all("/*", auth.verifyToken);

router.get("/", event.getEvent);
router.get("/:id", event.getDetail);
router.get("/address", event.getAddress);
router.post("/like", event.like);
router.post("/dislike", event.dislike);
router.post("/likeInfo", event.likeinfo);

module.exports = router;