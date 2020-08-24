const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    group: {type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true},
    },
    {timestamps:true}
);

module.exports = mongoose.model('Project', projectSchema);