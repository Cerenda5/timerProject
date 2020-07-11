// Imports
var express = require ('express');

// Instantiate server
var server = express();

// Configure routes
server.get('/', function (req, res) { // Récupére info du server
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Hello guys !</h1>')
});

// Launch server
server.listen(8080, function() {
  console.log('Server listening :)');
});