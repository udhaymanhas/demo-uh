///**
// * Created by UdHaY on 06-Aug-16.
// */
//'use strict';
//
//var Admin = require('../models/admin');
//
//exports.initAdmin = function(req, res) {
//
//    Users.findOne({'username': req.body.username, 'password': req.body.password}, function (err, event) {
//        if(err) { throw err; }
//
//        if(event){
//            res.json("Added");
//        }
//        else{
//
//            var newAdmin = new Admin();
//
//            newAdmin.username = req.body.username;
//            newAdmin.password = req.body.password;
//
//
//            newAdmin.save(function (err, result) {
//                if(err) { throw err; }
//                 res.json(result);
//            });
//
//        }
//    });
//};
