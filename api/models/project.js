const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    }},
    {timestamps:true}
);

module.exports = mongoose.model('Project', projectSchema);