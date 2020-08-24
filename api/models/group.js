const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, , 'Groupe name is required'],
        match: /[a-z]/,
        minlength: [3, 'Group name too long !'],
    },
    user: {
        type: String,
        required: true,
        min: 3,
        max: 20
    }},
    {timestamps:true}
);

module.exports = mongoose.model('Group', groupSchema);