'use strict';

var _ = require('underscore');
var util = require('../util/util');
var jsonFile = './data/province.json';

let dataSource = JSON.parse(util.readFile(jsonFile));

exports.get_all = function(re, res){
    return dataSource;
};

exports.get_by_id = function(conId, res){
    var filtered = dataSource.filter (c=> c.provinceCode == conId);
    return filtered;
};
