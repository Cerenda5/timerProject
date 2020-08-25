const mongoose = require('mongoose');

const timerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    project: {type: mongoose.Schema.Types.ObjectId, ref:'Project', required: true}
    },
    {timestamps:true}
);

module.exports = mongoose.model('Timer', timerSchema);