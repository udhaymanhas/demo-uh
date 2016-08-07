/**
 * Created by UdHaY on 06-Aug-16.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//var CollegeSchema = new Schema({
//    name: String,
//    degree: String
//});

var CollegeSchema = new Schema({
    name: String,
    degree: String
});


module.exports = mongoose.model('Colleges', CollegeSchema);