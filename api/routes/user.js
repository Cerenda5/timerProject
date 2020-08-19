const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
    // Validate data before creation of user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash the passwords "level" 10
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword 
    })
    try {
        const savedUser = await user.save();
        res.send({user: user._id});

    }catch(err){
        res.status(400).send(err);
    }
});

// LOGIN

router.post('/login', async (req, res) => {
    // Validate data before creation of user
    const {error} = loginValidation(req.body);
      if(error) return res.status(400).send(error.details[0].message);
      
    // Checking if the email already exist
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found');
    
    // Checking if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid password')


    // Create and assign a token (use this _id for the front-end)
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    res.send('Logged in !');
})


module.exports = router;