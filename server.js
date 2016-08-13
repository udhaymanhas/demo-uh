/**
 * Created by UdHaY on 05-Aug-16.
 */
'use strict';

var express = require('express');
var routes = require('./server/routes/index.js');
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
//var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var User = require('./server/models/users');
var app = express();

//mongoose.connect('mongodb://localhost:27017/db');
mongoose.connect('mongodb://udhaymanhas:qwertyuiop@ds145325.mlab.com:45325/db-unihire');

app.use('/', express.static(process.cwd() + '/public'));
app.use('/jquery', express.static(process.cwd() + '/node_modules/jquery'));
app.use('/angular', express.static(process.cwd() + '/node_modules/angular'));
app.use('/angular-sanitize', express.static(process.cwd() + '/node_modules/angular-sanitize'));
app.use('/angular-xeditable', express.static(process.cwd() + '/node_modules/angular-xeditable'));
app.use('/angular-mass-autocomplete', express.static(process.cwd() + '/node_modules/angular-mass-autocomplete'));
app.use('/fuse', express.static(process.cwd() + '/node_modules/fuse'));
app.use('/bootstrap', express.static(process.cwd() + '/node_modules/bootstrap'));

app.use(cookieParser());
app.use(session({secret: 'ssshhhhh',resave: true, cookie:{maxAge:180000}}));
//app.use(session({
//    secret: 'unihire',
//    resave: false,
//    saveUninitialized: true
//}));

//passport.use(User.createStrategy());
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

//need this according to passport guide
//app.use(cookieParser());
//app.use(session({
//    secret: 'the princess and the frog',
//    saveUninitialized: true,
//    resave: true
//}));
//app.use(passport.initialize());
//app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes(app, passport);

var port = process.env.PORT || 3000;

app.listen(port,  function () {
    console.log('Node.js listening on port ' + port);
});
