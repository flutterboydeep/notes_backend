
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Notes = require('./models/noteModel');


mongoose.connect("mongodb+srv://deep:deep123@cluster0.bwoiy.mongodb.net/notesdb").then(function () {

    app.get("/", function (req, res) {
        res.send("This is homepage ");
    });

    app.get("/notes/list", async function (req, res) {
        var notes = await Notes.find();
        res.json(notes);

    });

    app.get("/notes/add", async function (req, res) {
        var addNewNote = new Notes({
            id: '3',
            userid: "depak@gmail.com",
            title: "My first note",
            content: "this is first content"
        });
        await addNewNote.save();
        const response = { message: "New Note Created 🙂" };

        res.json(response);
        // res.send("This is notes for you and i am doing great for yu");
    });
    console.log("I am started mongooes connect");
});

app.listen(5001, function () {
    console.log("server started at port at : 5001");
});