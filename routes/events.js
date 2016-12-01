var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))

//build the REST operations at the base for blobs
//this will be accessible from http://127.0.0.1:3000/blobs if the default route for / is left unchanged
router.route('/')
    //GET all blobs
    .get(function(req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Event').find({}).sort('-updated_at').exec(function (err, events) {
              if (err) {
                  return console.error(err);
              } else {
                  res.json(events);
              }
        });
    })
    //POST a new blob
    .post(function(req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        if (req.body.title == null || req.body.description == null){
          console.log("Missing attributes!");
          res.json({
            'error': 'Missing attributes'
          });
        }
        console.log(req.body);
        var title = req.body.title;
        var description = req.body.description;
        var enabled = true;
        //call the create function for our database
        mongoose.model('Event').create(req.body, function (err, event) {
              if (err) {
                  res.send(err.message);
              } else {
                  //Blob has been created
                  console.log('POST creating new event: ' + event);
                  res.format({
                      //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    /*html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("blobs");
                        // And forward to success page
                        res.redirect("/blobs");
                    },*/
                    //JSON response will show the newly created blob
                    json: function(){
                        res.json(event);
                    }
                });
              }
        })
    });

module.exports = router;
