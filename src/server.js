
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Notes = require('./models/noteModel');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); //app.use=> mean that bodyparser use in whole project and extended mean it will contain nested json or not
app.use(bodyParser.json());

mongoose.connect("mongodb+srv://deep:deep123@cluster0.bwoiy.mongodb.net/notesdb").then(function () {

    app.get("/", function (req, res) {
        res.send("This is homepage ");
    });

    /* ------ if find json according to particular userid then-----------*/
    // app.get("/notes/list/:userId", async function (req, res) {
    //     var notes = await Notes.find({ userid: req.params.userId }); //if userid ==req.params.userid
    //     // var notes = await Notes.find();
    //     res.json(notes);

    // });


    app.get("/notes/list", async function (req, res) {
        var notes = await Notes.find(); //if userid ==req.params.userid
        // var notes = await Notes.find();
        res.json(notes);

    });

    /*
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
    */



    app.post("/notes/add", async function (req, res) {
        try {
            const addNewNote = new Notes({
                id: req.body.id,
                userid: req.body.userid,
                title: req.body.title,
                content: req.body.content,
            });

            await addNewNote.save();
            const response = { message: "New Note Added 🙂 " + `id: ${req.body.id}` };
            res.json(response);

        } catch (error) {
            res.status(500).json({ message: "Failed to Add Notes ", error })
        }


    });

    // 1 issue form this method this method  add json data in last because if item == exist then delete after it add new item 
    app.post("/notes/update", async function (req, res) {
        try {

            await Notes.deleteOne({ id: req.body.id }); //if item is in json then delete that item than add new item 
            const addNewNote = new Notes({
                id: req.body.id,
                userid: req.body.userid,
                title: req.body.title,
                content: req.body.content,
            });

            await addNewNote.save();
            const response = { message: "New Note Added 🙂 " + `id: ${req.body.id}` };
            res.json(response);

        } catch (error) {
            res.status(500).json({ message: "Failed to Add Notes ", error })
        }


    });


    /*    // --------update json 2st method -----------------
    app.put("/notes/update/:id", async function (req, res) {
        const notesId = req.params.id;


        try {
            // const updateData = await Notes.findByIdAndUpdate(notesId, {   //  mongoose id enter who give bydefault to every document mean=>notes/update/672f48d8b66a0ffd2d016d6e on url  
            const updateData = await Notes.findOneAndUpdate({ id: notesId }, {    //  find item by our custom id who made by me notes/update/3

                userid: req.body.userid,
                title: req.body.title,
                content: req.body.content,
            }, {
                new: true
            });


            if (updateData == null) {
                return res.status(404).json({ message: "Data not Found from this id " + `${notesId}` });
            } else {
                return res.json({ message: "Note Updated ✅" });
            }


        } catch (e) {
            // console.error("Error updating note:", error);
            res.status(500).json({ message: "Failed to update note", e });
            console.log("error is in ", e);
}
    });
*/


});

app.post("/notes/delete", async function (req, res) {
    await Notes.deleteOne({ id: req.body.id });

    res.json({ message: `${req.body.id}` + " ---> " + `${req.body.title}` + "Notes deleted" });
});


app.listen(5001, function () {
    console.log("server started at port at : 5001");
});