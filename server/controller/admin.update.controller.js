/**
 * Created by UdHaY on 06-Aug-16.
 */
'use strict';

var Colleges = require('../models/colleges');

exports.updateCollege = function(req, res) {

    Colleges.findOne({'name': req.body.name}, function (err, event) {
        if(err) { throw err; }

        if(event){
            res.json("Added"); //update
        }
        else{

            var newCollege = new Colleges();
            newCollege.name = req.body.name;
            newCollege.degree = req.body.degree;

            newCollege.save(function (err, result) {
                if(err) { throw err; }
                 res.json(result);
            });

        }
    });
};

exports.saveCollege = function(req, res) {
    var save = {};
    console.log(req.body);

    var query = {'_id':req.body._id};

    save.name = req.body.name;
    save.degree = req.body.degree;

    Colleges.findOneAndUpdate(query, save, {upsert:true}, function(err, doc){
        //console.log('REACHING------------');
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });

};

exports.delCollege = function(req, res) {
    console.log(req.body._id);
    Colleges.find({ _id:req.body._id }).remove().exec();
    return res.send("deleted");
};

