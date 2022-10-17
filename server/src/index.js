const express = require("express");
const app = express();
const port = 8000;
const bodyParser = require("body-parser");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.listen(port, () => {
    console.log("Server Port : ", port);
});