const mongoose = require('mongoose')
const mongooseSchema = mongoose.Schema

let userSchema = new mongooseSchema(
    {
        firstName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLenght: [3, "Firstname is too short"],
            maxLength: 15
        },
        lastName: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            minLenght: [3, "Lastname is too short"],
            maxLength: 15
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            hide: true
        },
    },
    {timestamps: true}
);

userSchema.path('firstName').validate(function (firstName) {
    var stringRegex = /[a-z]/;
    return stringRegex.test(firstName);
}, 'The Firstname field is not in the correct format.')

userSchema.path('lastName').validate(function (lastName) {
    var stringRegex = /[a-z]/;
    return stringRegex.test(lastName);
}, 'The Lastname field is not in the correct format.')

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email);
}, 'The email field is not in the correct format.')

// Transform _id by id for the front-end 
userSchema.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model("User", userSchema);