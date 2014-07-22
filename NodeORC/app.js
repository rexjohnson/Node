
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var port = process.env.PORT || 4300;
var config = require('./libs/config/config.js');

//load customers route
//var customers = require('./routes/customers'); 
var app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);
exports.io = io;


// all environments
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, config.fileslocation + "/uploads")));
app.use(express.cookieParser());
app.use(express.session({ secret: 'nodeORCAPPsecretforsecurityandmanagement_007' }));

//development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

var routes = require('./libs/routes')(app);
server.listen(port);
