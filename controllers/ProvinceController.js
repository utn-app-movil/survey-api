'use strict';

let model = require('../models/ProvinceModel');

exports.get_all = function(req, res){
    res.json(model.get_all());
};

exports.get_by_id = function(req, res){
    res.json(model.get_by_id(req.params.id));
};