const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, , 'Project name is required'],
        match: /[a-z]/,
        minlength: [3, 'Project name too short !'],
        maxlength: [20 , 'Project too long !'],
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require: "Admin is required"
    },
    group: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group', 
        required: true
    },
    timer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Timer', 
        require: "Timer is required"
    }
    },
    {timestamps:true}
);

module.exports = mongoose.model('Project', projectSchema);