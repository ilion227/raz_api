var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var request = require('request');


router.route('/')

    //GET get-events

    .get(function(req, res, next) {
      var PROMET_API_URL = 'https://opendata.si/promet/events/';

      console.log("Im here!");
      let counter = 0;

       request(PROMET_API_URL, (error, response, body, callback) => {
        if (!error && response.statusCode === 200){

          let data = JSON.parse(body);

          let items = data.Contents[0].Data.Items;
          let log = "";

          let date = new Date();

          var promises = items.map( (item) => {
            return new Promise( (resolve, reject) => {
              let event = {
                content_category: item.ContentName,
                priority: item.Prioriteta,
                title: item.Title,
                description: item.Description,
                road_type: item.Kategorija,
                section: item.Odsek,
                chainage: item.Stacionaza,
                lat: item.y_wgs,
                lon: item.x_wgs,
                road_priority: item.PrioritetaCeste,
                is_road_closed: item.IsRoadClosed,
                content_name: item.ContentName,
                border_crossing: item.isMejniPrehod,
                road: item.cesta,
                status: {
                  valid_from: item.VeljavnostOd,
                  valid_until: item.VeljavnostDo
                },
                updated_at: item.Updated,
                event_id: item.Id
              }

              // TODO Check events by event_id
              //
              // TODO check by updated_at
              //

              mongoose.model('Event').create(event, (err, event) => {
                if (err) {
                  console.log(err.message);
                  log += err.message + "\n";
                } else {
                  counter = counter + 1;
                  console.log("Insert sucessfull!");
                  log += "Item " + item.Id + " sucessfully inserted with _id: " + event._id + ".\n";
                }
                resolve();
              });
            });
          });

          Promise.all(promises)
          .then( () => {
            console.log("END OF PROMISES");
            res.render('get-events', { title: 'Added ' + counter + ' events.', date: date, output: log });
          })
          .catch(console.error);




        } else {
          console.log(error);
        }
      });
    })




    module.exports = router;
