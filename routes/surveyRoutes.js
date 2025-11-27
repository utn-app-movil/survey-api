'use strict';
module.exports = function (app){
    var province = require('../controllers/ProvinceController');    
    var people = require('../controllers/PeopleController');

    //province
   app.route('/province')
        .get(province.get_all);

   app.route('/province/:id')
        .get(province.get_by_id);


   //people
     app.route('/people')
          .get(people.get_all);

     app.route('/people/:id')
          .get(people.get_by_id);

     app.route('/people')
          .post(people.create);

     app.route('/people')
          .put(people.update);

     app.route('/people')
          .delete(people.remove);
     
};