const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, { cors : { origin : "*" }});
const bodyParser = require("body-parser");
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

const event = require("./controller/EventController");

app.use("/event", eventRouter);
app.use("/user", userRouter);
app.use("/email", emailRouter);
app.use("/schedule", scheduleRouter);
app.use("/review", reviewRouter);

app.get("/", event.getMain);

io.on("connection", (socket) => {

    socket.on("enterRoom", (room, done) => {
        socket.join(room.room);
        done();
        // 자신 제외
        socket.to(room.room).emit("welcome");
        // 자기한테도
        // socket.emit("welcome");
    })

    socket.on("newMsg", (data, done) => {
        socket.to(data.room).emit("newMsg", data.msg);
        done();
    })

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) => {
            socket.to(room).emit("bye");
        })
    })

    // io.emit("notice", socket.id + "입장");

    // socket.on("disconnect", () => {
    //     io.emit("notice", socket.id + "퇴장");
    // })

    // socket.on("send", (data) => {
    //     io.emit("newMsg", data.msg);
    // })
})

http.listen(port, () => {
    console.log("Server Port : ", port);
});