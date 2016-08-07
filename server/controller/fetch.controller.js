/**
 * Created by UdHaY on 06-Aug-16.
 */
var mongoose = require('mongoose');
var College = require('../models/college');

exports.fetch = function(req, res) {

    College.find({}, function (err, event) {
        if(err) {throw err;}
        if(event){
            res.json(event);
            console.log('EMPTY');
        }
        else
            res.json({"collegeData":"empty"});
    });
};
