require('dotenv').config(); //Variable environnement
const express = require ('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); //cors fournit un middleware Express pour activer CORS avec diverses options.
const dbconfig = require('./config/db.config')
const userRoute = require('./src/routes/user.routes');
const projectRoutes = require('./src/routes/project.routes');

const app = express();
let corsOptions = {
  origin: "http://localhost:8080"
};

//  CORS
app.use(cors(corsOptions)); // parse requests of content-type - application/json
app.use(bodyParser.json()); // parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

console.log(dbconfig.db());
mongoose.Promise = global.Promise;
mongoose
  .connect(dbconfig.db(), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

userRoute(app);
projectRoutes(app);

app.listen(process.env.NODE_ENV === "development" ? process.env.DEV_SRV_PORT : process.env.PORT, () =>{
  if(process.env.NODE_ENV === "development"){
    console.log('App Listening on Host: ' + process.env.SRV_HOST + ' / Port server: ' + process.env.DEV_SRV_PORT);
  }
})