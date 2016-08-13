/**
 * Created by UdHaY on 05-Aug-16.
 */
'use strict';

var path = process.cwd();

module.exports = function (app, passport) {
    var sess;
    app.route('/')
        .get(function (req, res) {
            //sess=req.session;
            console.log('INSIDE root Route');
            console.log(req.session);
            res.sendFile(path + '/public/index.html');
        });

    app.get('/confirm-login', function (req, res) {
        //res.send(req.session)
        console.log('INSIDE GET CONFIRM LOGIN');
        console.log(req.session);
        console.log(req.session.name);
        require('../controller/login.controller').confirm_login(req, res);
        });

    app.get('/user/logout', function (req, res) {
        //res.send(req.session)
        //console.log('INSIDE GET CONFIRM LOGIN');
        //console.log(req.session);
        //console.log(req.session.name);
        require('../controller/login.controller').logout(req, res);
    });

    app.route('/admin')
        .get(function(req, res) {
            res.sendFile(path + '/public/admin.html');
        });


    app.post('/api/events', function (req, res) {
        require('../controller/events.controller').userRegister(req, res); //new registration
    });

    app.get('/api/login/:username/:password', function (req, res) {
        require('../controller/login.controller').login(req, res); //login student
    });

    app.get('/api/admin/:username/:password', function (req, res) {
        require('../controller/login.controller').adminLogin(req, res); //login admin
    });

    app.get('/api/data/students', function (req, res) {
        require('../controller/admin.fetch.controller').fetchStudents(req, res); //login admin
    });

    app.get('/api/data/colleges', function (req, res) {
        require('../controller/admin.fetch.controller').fetchColleges(req, res); //login admin
    });

    app.post('/api/data/addCollege', function (req, res) {
        require('../controller/admin.update.controller').updateCollege(req, res); //login admin
    });

    app.post('/api/data/colleges/save', function (req, res) {
        require('../controller/admin.update.controller').saveCollege(req, res); //login admin
    });

    app.post('/api/data/colleges/updateStudentCollege', function (req, res) {
        require('../controller/login.controller').updateStudentCollege(req, res); //login admin
    });

    app.post('/api/data/colleges/delete', function (req, res) {
        require('../controller/admin.update.controller').delCollege(req, res); //login admin
    });

    app.route('/*')
        .get(function(req, res) {
            res.sendFile(path + '/public/index.html');
        });



    };


