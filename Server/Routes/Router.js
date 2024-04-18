const express = require('express');
const Router = express.Router();
const Users = require('../Models/UserSchema');
const verifyToken = require('../middleware/auth');

Router.post('/newuser', verifyToken, async (req, res) => {
    const { name, email, age, mobile, work, add, desc } = req.body;
    if (!name || !email || !age || !mobile || !work || !add || !desc) {
        return res.status(400).json({ message: "Internal Server Error" });
    }
    try {

        const addUser = new Users({
            name: name,
            email: email,
            age: age,
            mobile: mobile,
            work: work,
            add: add,
            desc: desc,
            creator: req.user._id,
            AddedAt: new Date(),
        });

        await addUser.save();
        res.status(201).json(addUser);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

Router.get('/getdata', verifyToken, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            const RegisterUsers = await Users.find({ creator: req.user._id });
            res.status(200).json(RegisterUsers);
        }
        else {
            const EmployeeEntryData = await Users.find({});
            res.status(200).json(EmployeeEntryData);
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
Router.get('/getuser/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const RegisterUsers = await Users.find({ _id: id, creator: req.user._id });
        res.status(200).json(RegisterUsers);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
Router.patch('/updateuser/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const updateUser = await Users.findOneAndUpdate({ _id: id, creator: req.user._id }, req.body, {
            new: true
        });
        if (!updateUser) {
            return res.status(404).json({ message: 'User not found or unauthorized' });
        }
        updateUser.EditedAt = new Date();
        await updateUser.save(); // Save the updated user
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


Router.delete('/deleteuser/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    try {
        const deleteUser = await Users.findOneAndDelete({ _id: id, creator: req.user._id });
        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found or unauthorized' });
        }
        res.status(200).json(deleteUser);
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = Router;
