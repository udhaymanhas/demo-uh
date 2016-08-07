/**
 * Created by UdHaY on 06-Aug-16.
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AdminSchema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('Admins', AdminSchema);