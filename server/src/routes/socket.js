const express = require("express");
const router = express.Router();
const socket = require("../controller/SocketController");

router.get("/get", socket.get);
router.post("/send", socket.postSend);

module.exports = router;