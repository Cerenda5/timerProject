require('dotenv').config(); //Variable environnement
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');


const projectRoutes = require('./routes/projects');
const groupRoutes = require('./routes/groups');
const userRoutes = require('./routes/users');
const timerRoutes = require('./routes/timers');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => console.log('Server up and running'));

// Connect to DB
mongoose.connect(
    'mongodb+srv://Timer:' + process.env.MONGO_PW + '@timerproject.3tnvk.mongodb.net/timer?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
        useFindAndModify: true,
        useCreateIndex: true
    }, (err, res) => { 
        if (err) throw err;  
        console.log('Connected to MongoDb database');
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
               'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/projects', projectRoutes);
app.use('/groups', groupRoutes);
app.use('/users', userRoutes);
app.use('/timers', timerRoutes);

// Not find Error
app.use((req, res, next) => {
    const error = new Error('Not found');
    console.log(error);
    error.status= 404;
    next(error);
})

// Middleware Error
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;