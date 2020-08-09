const mongoose = require('mongoose')
const mongooseSchema = mongoose.Schema

let projectSchema = new mongooseSchema(
    {
        projectName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLenght: [3, "projectName is too short"],
            maxLength: 15
        }
    },
    {timestamps: true}
);

projectSchema.path('projectName').validate(function (projectName) {
    var stringRegex = /[a-z]/;
    return stringRegex.test(projectName);
}, 'The projectName field is not in the correct format.')


// Transform _id by id for the front-end 
projectSchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("Project", projectSchema);