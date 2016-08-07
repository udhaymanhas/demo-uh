/**
 * Created by UdHaY on 06-Aug-16.
 */
var mongoose = require('mongoose');
var Users = require('../models/users');
var Admins = require('../models/admins');

exports.login = function(req, res) {
    //console.log('-------->');
    //console.log(req.params);
    Users.find({'username': req.params.username, 'password':req.params.password}, function (err, event) {
        if(err) {throw err;}
        if(event){
            console.log(event);

            if(event[0] != undefined){
                var student = {
                    "name":event[0].firstName,
                    "collegeName":event[0].collegeName,
                    "degreeName":event[0].collegeDegree,
                    "_id":event[0]._id
                };

                res.json(student);
            }
            else
                res.json({"userExists":false});


        }
        else
            res.json({"userExists":false});
    });
};

exports.adminLogin = function(req, res) {
    //console.log('-------->');
    //console.log(req.params);
    //Users.find({'username': req.params.username, 'password':req.params.password},{_id:0, __v:0}, function (err, event) {
    //    if(err) {throw err;}
    //    if(event){
    //        //console.log('***************************************')
    //        //console.log(event[0]);
    //        if(event[0] != undefined)
    //            res.json({"name":event[0].firstName});
    //        else
    //            res.json({"name":false});
    //    }
    //    else
    //        res.json({"userExists":false});
    //});

    Admins.find({'username': req.params.username, 'password':req.params.password},{_id:0, __v:0}, function (err, event) {
        if(err) {throw err;}
        if(event){
            console.log('***************************************')
            console.log(event);
            if(event[0] != undefined)
                res.json({"username":event[0].username});
            else
                res.json({"userExists":false});
        }
        else
            res.json({"userExists":false});
    });
};

exports.updateStudentCollege = function(req, res) {
    var save = {};
    //console.log(req.body);
    var query = {'_id':req.body._id};
    save.collegeName = req.body.collegeName;
    save.collegeDegree = req.body.collegeDegree;
    Users.findOneAndUpdate(query, save, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("success");
    });

};
