const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, , 'User name is required'],
        match: /[a-z]/,
        minlength: [3, 'User name too short !'],
        maxlength: [20 , 'User name too long !'],
    },
    email: {
        type: String,
        required: [true, , 'Email is required'],
        unique: true,
        match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    },
    password: {
        type: String,
        required: [true, , 'Password is required'],
    }},
    {timestamps:true}
);

module.exports = mongoose.model('User', userSchema);