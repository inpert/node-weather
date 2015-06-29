// set up =================================================
var express = require('express');
var app = express();                              
var morgan = require('morgan');            
var bodyParser = require('body-parser');   
var methodOverride = require('method-override'); 

// configuration ==========================================
app.use(express.static(__dirname + '/www'));                
app.use(morgan('dev'));                                  
app.use(bodyParser.urlencoded({ 'extended': 'true' }));          
app.use(bodyParser.json());                                  
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// listen (start app with node server.js) =================
app.listen(1337);
console.log('App listening on port 1337');