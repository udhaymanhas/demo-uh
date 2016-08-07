/**
 * Created by UdHaY on 06-Aug-16.
 */
'use strict';

var Users = require('../models/users');

exports.userRegister = function(req, res) {

    Users.findOne({'firstName': req.body.firstName, 'lastName': req.body.lastName, 'username': req.body.email}, function (err, event) {
        if(err) { throw err; }

        if(event){
            res.json("Added");
        }
        else{

            var newUser = new Users();

            newUser.firstName = req.body.firstName;
            newUser.lastName = req.body.lastName;
            newUser.username = req.body.email;
            newUser.password = req.body.pwd;

            //newUser.collegeName = '';
            //newUser.collegeDegree = '';

            console.log(req.body.firstName && req.body.email && req.body.pwd);


            if(typeof (req.body.firstName && req.body.email && req.body.pwd) !== 'undefined'){
                console.log('---->');
                newUser.save(function (err, result) {
                    if(err) { throw err; }
                    res.json(result);
                });
            }
            else{

                res.json("empty");
            }


        }
    });
};
