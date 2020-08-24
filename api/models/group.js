const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
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