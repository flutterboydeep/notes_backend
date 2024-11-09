
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://deep:deep123@cluster0.bwoiy.mongodb.net/notesdb").then(function () {

    app.get("/", function (req, res) {
        res.send("This is homepage ");
    });
    app.get("/data", function (req, res) {
        res.send("This is data page");
    });
    app.get("/data/notes", function (req, res) {
        res.send("This is notes for you");
    });
    console.log("I am started mongooes connect");
});

app.listen(5001, function () {
    console.log("server started at port at : 5001");
});