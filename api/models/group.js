const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: [true, 'Groupe name is required'],
        match: /[a-z]/,
        minlength: [3, 'Group name too long !'],
    },
    users:  [{
          type: mongoose.Types.ObjectId,
          ref: 'User',
          require: "Users is required"
    }],
    projects: [{
        type: mongoose.Types.ObjectId,
        ref: 'Project',
    }]
    },
    
    {timestamps:true}
);


module.exports = mongoose.model('Group', groupSchema);