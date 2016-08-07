/**
 * Created by UdHaY on 06-Aug-16.
 */
'use strict';
//userId: { type: Number, ref: 'UserId' },
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
//var autoIncrement = require('mongoose-auto-increment');

var User = new Schema({});
//UserSchema.plugin(autoIncrement.plugin, 'UserId');
//var options = ({missingPasswordError: "Foutief password"});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);