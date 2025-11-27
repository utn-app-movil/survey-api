'use strict';

let model = require('../models/VaccineModel');

exports.get_all = function(req, res){
    res.json(model.get_all());
};

exports.get_by_id = function(req, res){
    res.json(model.get_by_id(req.params.id));
};

exports.create = function(req, res){
    res.json(model.create(req.body));
};

exports.update = function(req, res){
    res.json(model.update(req.body));
};

exports.remove = function(req, res){
    res.json(model.remove(req.body.vaccineId));
};