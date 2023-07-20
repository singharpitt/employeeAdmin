const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: String,
        require: true
    },
    mobile: {
        type: Number,
        require: true
    },
    work: {
        type: String,
        require: true
    },
    add: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
});
const employee=new mongoose.model("employees",Schema);
module.exports=employee;