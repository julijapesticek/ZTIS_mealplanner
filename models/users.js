const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true,
    // },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
        required: true,
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const User = mongoose.model('user', userSchema, 'Users');
module.exports = User;