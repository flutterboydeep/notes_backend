
const express = require('express');
const app = express();
app.get("/", function (req, res) {
    res.send("This is homepage ");
});
app.get("/data", function (req, res) {
    res.send("This is data page");
});
app.get("/data/notes", function (req, res) {
    res.send("This is notes for you");
});

app.listen(5001, function () {
    console.log("server started at port at : 5001");
});