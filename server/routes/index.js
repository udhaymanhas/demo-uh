/**
 * Created by UdHaY on 05-Aug-16.
 */
'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

    app.route('/')
        .get(function (req, res) {
            res.sendFile(path + '/public/index.html');
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
