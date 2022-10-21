const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const eventRouter = require("./routes/event");
const userRouter = require("./routes/user");
const emailRouter = require("./routes/email");

const event = require("./controller/EventController");

app.use("/event", eventRouter);
app.use("/user", userRouter);
app.use("/email", emailRouter);

app.get("/", event.getMain);

app.listen(port, () => {
    console.log("Server Port : ", port);
});