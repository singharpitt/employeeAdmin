const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    add: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    AddedAt: {
        type: Date,
        default: null,
    },
    EditedAt: {
        type: Date,
        default: null,
    }
});

const employee = mongoose.model("employees", Schema);
module.exports = employee;
