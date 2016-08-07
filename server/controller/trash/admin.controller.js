///**
// * Created by UdHaY on 06-Aug-16.
// */
//var mongoose = require('mongoose');
//var Admins = require('../models/admins');
//
//exports.adminLogin = function(req, res) {
//    console.log('-------->');
//    console.log(req.params);
//    Admins.find({'userndame': req.params.username, 'password':req.params.password},{_id:0, __v:0}, function (err, event) {
//        if(err) {throw err;}
//        if(event){
//            console.log(event);
//            res.json(event[0]);
//
//        }
//        else
//            res.json({"collegeData":"empty"});
//    });
//
//    //Admin.find({},function (err, event) {
//    //    if(err) {throw err;}
//    //    if(event){
//    //        res.json(event[0]);
//    //        console.log(event);
//    //    }
//    //    else
//    //        res.json({"collegeData":"empty"});
//    //});
//};
