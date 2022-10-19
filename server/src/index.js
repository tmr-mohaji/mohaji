const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const eventRouter = require("./routes/event");
const userRouter = require("./routes/user");

app.use("/event", eventRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log("Server Port : ", port);
});