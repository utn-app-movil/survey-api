'use strict';

var _ = require('underscore');
var util = require('../util/util');
var httpresponse = require('../util/httpResponse')
var jsonFile = './data/people.json';

let dataSource = JSON.parse(util.readFile(jsonFile));

exports.get_all = function(re, res){
    return {
        data: dataSource,
        responseCode: httpresponse.OK,
        message: 'Action executed sucessfully.'
    };
};

exports.get_by_id = function(id, res){
    var filtered = dataSource.filter (c=> c.personId == id);
    if (filtered.length > 0){
        return {
            data: filtered,
            responseCode: httpresponse.OK,
            message: 'Action executed sucessfully.'
        };
    }else{
        return {
            data: [],
            responseCode: httpresponse.BAD_REQUEST,
            message: 'The person does not exist.'
        };
    }
    
};

exports.create = function(re, res){
    var data=null;
    try {
        if (re === null || JSON.stringify(re) === '{}'){
            return {
                data: data,
                responseCode: httpresponse.BAD_REQUEST,
                message: 'Action was not executed, the endpoint needs a JSON in the body.'
            };
        }
        var list = this.get_by_id(re.personId);
        if (list.data.length > 0){
            return {
                data: data,
                responseCode: httpresponse.BAD_REQUEST,
                message: 'Duplicate data is not allowed. The person is already stored. Try to insert another one.'
            };
        }else{
            dataSource.push(re);        
            util.writeFile(JSON.stringify(dataSource), jsonFile);
            data = re;
            return {
                data: data,
                responseCode: httpresponse.OK,
                message: 'The person was inserted sucessfully.'
            };
        }
    } catch (error) {
        return {
            data: null,
            responseCode: httpresponse.BAD_REQUEST,
            message: error
        };
    }    
};

exports.update = function(re, res){
    var message= '';
    var data = null;
    if (re === null || JSON.stringify(re) === '{}'){
        return {
            data: data,
            responseCode: httpresponse.BAD_REQUEST,
            message: 'Action was not executed, the endpoint needs a JSON in the body.'
        };
    }
    var list = this.get_by_id(re.personId);
    if (list.data.length > 0){
        dataSource = dataSource.filter((el) => {
            return el.personId !== list.data[0].personId;
          });

        dataSource.push(re);
        util.writeFile(JSON.stringify(dataSource), jsonFile);
        data = re;
        return {
            data: data,
            responseCode: httpresponse.OK,
            message: message
        };
    }else{     
        return {
            data: data,
            responseCode: httpresponse.BAD_REQUEST,
            message: 'The information was not found to be updated.'
        };
    }
};

exports.remove = function(id, res){
    var data = null;
    if (id===null || id===''){
        return {
            data: data,
            responseCode: httpresponse.BAD_REQUEST,
            message: 'Deletion was not executed. It requires the person id.'
        };
    }
    var list = this.get_by_id(id);
    if (list.data.length > 0){
        dataSource = dataSource.filter((el) => {
            return el.personId !== list.data[0].personId;
          });
        util.writeFile(JSON.stringify(dataSource), jsonFile);
        data = list[0];
        return {
            data: data,
            responseCode: httpresponse.OK,
            message: 'Information was removed properly.'
        };
    }else{     
        return {
            data: data,
            responseCode: httpresponse.BAD_REQUEST,
            message: 'The information was not found to be removed.'
        };
    }
};