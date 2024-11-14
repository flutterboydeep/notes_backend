
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false })); //app.use=> mean that bodyparser use in whole project and extended mean it will contain nested json or not
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://deep:deep123@cluster0.bwoiy.mongodb.net/notesdb").then(function () {

    app.get("/", function (req, res) {
        // res.send("This is homepage ");
        res.json({ message: "Api worked sucessfuly" })
    });

    /* ------ if find json according to particular userid then-----------*/
    // app.get("/notes/list/:userId", async function (req, res) {
    //     var notes = await Notes.find({ userid: req.params.userId }); //if userid ==req.params.userid
    //     // var notes = await Notes.find();
    //     res.json(notes);

    // });
    const notesRouter = require("./routes/notes_routes");
    app.use("/", notesRouter);



});
const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log("server started at port at : " + PORT);

});