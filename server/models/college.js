/**
 * Created by UdHaY on 06-Aug-16.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CollegeSchema = new Schema({
    collegeName: String,
    degree: String
});

module.exports = mongoose.model('College', CollegeSchema);