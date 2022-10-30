const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors : { origin : "*" }});
const bodyParser = require("body-parser");
const passport = require('passport');
const session = require("express-session");
const cors = require("cors");
const port = 8000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const eventRouter = require("./routes/event");
const userRouter = require("./routes/user");
const emailRouter = require("./routes/email");
const scheduleRouter = require("./routes/schedule");
const reviewRouter = require("./routes/review");
const authRouter = require('./routes/auth');
const socketRouter = require('./routes/socket');

const event = require("./controller/EventController");

app.use("/event", eventRouter);
app.use("/user", userRouter);
app.use("/email", emailRouter);
app.use("/schedule", scheduleRouter);
app.use("/review", reviewRouter);
app.use("/socket", socketRouter);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'COOKIE_SECRET',
    cookie: {
      httpOnly: true,
      secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);

app.get("/", event.getMain);

let list = [];

io.on("connection", (socket) => {

    socket.emit("send_id", {id : socket.id});

    socket.on("send_name", (data) => {
        list[socket.id] = data.name;
        io.emit("notice", {msg : data.name + "님이 입장하였습니다."});
    })

    socket.on("send", async (data) => {
        io.emit("newMsg", {msg : data.msg, nickname : data.nickname});
    })

    socket.on("disconnect", () => {
        io.emit("notice", { msg : list[socket.id] + "님이 퇴장하셨습니다."});
        delete list[socket.id];
    })
})

http.listen(port, () => {
    console.log("Server Port : ", port);
});