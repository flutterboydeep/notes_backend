const express = require('express');
// const noteModel = require('./models/noteModel');
const router = express.Router();
const Notes = require('./../models/noteModel');

router.get("/notes", async function (req, res) {
    var notes = await Notes.find(); //if userid ==req.params.userid
    // var notes = await Notes.find();
    res.json(notes);

});
router.get("/notes/list", async function (req, res) {
    var notes = await Notes.find({ id: req.body.id }); //if userid ==req.params.userid
    // var notes = await Notes.find();
    res.json(notes);

});

/*
    router.get("/notes/add", async function (req, res) {
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



router.post("/notes/add", async function (req, res) {
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
router.post("/notes/update", async function (req, res) {
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
router.put("/notes/update/:id", async function (req, res) {
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




router.post("/notes/delete", async function (req, res) {
    try {
        // Retrieve the note to get its title before deletion
        const note = await Notes.findOne({ id: req.body.id });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Delete the note
        await Notes.deleteOne({ id: req.body.id });

        // Send a response with the deleted note's title
        res.json({ message: `${note.id} ---> ${note.title} Notes deleted` });
    } catch (error) {
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }
});

module.exports = router;