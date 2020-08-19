const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import Routes
const userRoute = require('./routes/user');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
{ useNewUrlParser: true,
  useUnifiedTopology: true, 
  useFindAndModify: true,}, 
(err, res) => { 
    if (err) throw err;  
    console.log('Connected to MongoDb database');
});

// Middleware
app.use(express.json());

//Routes Middlewares
app.use('/api/user', userRoute);

app.listen(3000, () => console.log('Server up and running'));