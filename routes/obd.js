var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.use(bodyParser.urlencoded({
    extended: true
}))
router.use(methodOverride(function (req, res) {
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

    .get(function (req, res, next) {
        //retrieve all blobs from Monogo
        mongoose.model('Obd').find({}).sort('-updated_at').limit(10).exec(function (err, obd) {
            if (err) {
                return console.error(err);
            } else {
                res.json(obd);
            }
        });
    })
    //POST new OBD data
    .post(function (req, res) {
        // Get values from POST request. These can be done through forms or REST calls. These rely on the "name" attributes for forms
        /*if (req.body.title == null || req.body.description == null){
          console.log("Missing attributes!");
          res.json({
            'error': 'Missing attributes'
          });
        }*/
        console.log(req.body);

        //call the create function for our database
        mongoose.model('Obd').create({
            "date": req.body.date * 1000,
            "rpm": req.body.rpm,
            "speed": req.body.speed,
            "load": req.body.load,
            "temp": req.body.temp
        }, function (err, obd) {
            if (err) {
                res.send(err.message);
            } else {
                //Blob has been created
                console.log('POST creating new obd data: ' + obd);
                res.format({
                    //HTML response will set the location and redirect back to the home page. You could also create a 'success' page if that's your thing
                    /*html: function(){
                        // If it worked, set the header so the address bar doesn't still say /adduser
                        res.location("blobs");
                        // And forward to success page
                        res.redirect("/blobs");
                    },*/
                    //JSON response will show the newly created blob
                    json: function () {
                        res.json(obd);
                    }
                });
            }
        })
    });

module.exports = router;