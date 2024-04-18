const express = require('express');
const Router = express.Router();
const handler = require('express-async-handler');
const { UserAuthModel } = require('../Models/UserLoginSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const verifyUser = require('../middleware/auth');
const salt_rounds = 4;
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


Router.delete('/deleteemployee/:id', verifyUser, handler(async (req, res) => {
    try {
        const { id } = req.params;
        const currentUser = req.user;

        if (!currentUser.isAdmin) {
            return res.status(401).send('Only admin users can delete employees');
        }

        const userToDelete = await UserAuthModel.findOneAndDelete({ _id: id });

        if (!userToDelete) {
            return res.status(404).send("User not found");
        }

        // Optionally, you can delete the user's image if it exists
        if (userToDelete.imageURL) {
            const imagePath = path.join(__dirname, '..', userToDelete.imageURL);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }

        res.status(200).send("User deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));

Router.post('/login', handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserAuthModel.findOne({ email });
    if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            user.lastLogin = new Date();
            await user.save();
            res.send(generateToken(user));
            return;
        }
        else {
            res.status(400).send('Username or password is invalid');
            return;
        }
    }
    res.status(400).send('User not exist');
}));
Router.get('/admin', verifyUser, handler(async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            res.status(401).send('Not a admin user');
            return;
        }

        const allUsers = await UserAuthModel.find({ isAdmin: false }, { password: 0 });
        if (!allUsers || allUsers.length === 0)
            return res.status(404).send('No Employee data');

        res.status(200).json(allUsers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}));


Router.get('/userexist/:id',  handler(async (req, res) => {
    const {id}=req.params;
    console.log(id);
    try {
        const findUser = await UserAuthModel.findOne({ _id: id });
        if (!findUser)
            {
                console.log("not found")
                res.json(false);
            }
        else  res.json(true);

    }
    catch (err) {
        res.status(500).send("Internal Server Error");


    }
}))

Router.post('/update', verifyUser, upload.single('image'), handler(async (req, res) => {
    const { name } = req.body;
    let { imageURL } = req.body;
    const userId = JSON.stringify(req.user._id).slice(1, -1);
    try {

        if (req.file) {
            imageURL = req.file.path;
        }
        const imagePath = path.join(__dirname, '..', req.user.imageURL);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(imagePath);
            } else {
                console.log('Image deleted successfully');
            }
        })
        const updatedUser = await UserAuthModel.findByIdAndUpdate(
            userId,
            { name, imageURL },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
}));


Router.post('/register', handler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await UserAuthModel.findOne({ email });
    if (user) {
        res.status(400).send('User Already Registered');
        return;
    }
    const hashPassword = await bcrypt.hash(password, salt_rounds);
    const newUser = {
        name,
        email: email,
        password: hashPassword,
    }
    const result = await UserAuthModel.create(newUser);
    result.lastLogin = new Date();
    await result.save();
    res.send(generateToken(result));
    return;
}));

const generateToken = user => {
    console.log(user);
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d',
        }
    );
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        imageURL: user.imageURL,
        token,
        isAdmin: user.isAdmin,
    };
};

module.exports = Router;
