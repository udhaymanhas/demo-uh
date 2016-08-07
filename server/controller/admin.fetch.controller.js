/**
 * Created by UdHaY on 06-Aug-16.
 */
var mongoose = require('mongoose');
var Users = require('../models/users');
var Colleges = require('../models/colleges');

exports.fetchStudents = function(req, res) {
    console.log('Fetch Stus');
    Users.find({}, function (err, event) {
        if(err) {throw err;}
        if(event){
            res.json(event);
        }
        else
            res.json({"fetchStudents":"NULL"});
    });
};

exports.fetchColleges = function(req, res) {
    console.log('Fetch Coll');
    Colleges.find({}, function (err, event) {
        if(err) {throw err;}
        if(event){
            res.json(event);
        }
        else
            res.json({"fetchColleges":"NULL"});
    });
};
