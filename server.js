var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var constants = require('./constants.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to exiting My Bank API' });   
});

router.route('/getPOS')

.get(function(req, res) {
  console.log(' type1 ' + req.query.type1 + ' type2 ' + req.query.type2
    +' type3 ' + req.query.type3 + ' type4 ' + req.query.type4);
  
  var result = [];
  for(let p of constants.pos)
  {
    console.log(' p.MCC_DSC ' + String(p.MCC_DSC) + " " +String(req.query.type1));
      if(String(p.MCC_DSC) == String(req.query.type1) ||
      String(p.MCC_DSC) == String(req.query.type2) || 
      String(p.MCC_DSC) == String(req.query.type3) || 
      String(p.MCC_DSC) == String(req.query.type4))
      {
           result.push(p);
      }
     
  }

  res.json({ message: 'success',
              status: 200,
              pos: result,  
                });

});
// more routes for our API will happen here

router.route('/login')
    // create a bear (accessed at POST http://localhost:8080/api/login)
    .post(function(req, res) {
            res.json({ message: 'success',
                       status: 200,
                       userName: req.body.userName,
                       password: req.body.password
                          });
        

    });

  router.route('/valOTP')
    // create a bear (accessed at POST http://localhost:8080/api/valOTP)
    .post(function(req, res) {

            if(String(req.body.otp) == '888888'){

              res.json({ message: 'success',
                       status: 200,
                       userName: req.body.userName,
                       password: req.body.password
                          });
            }else{
              res.json({ message: 'failed',
              status: 201,
            });
                        }

        

    });

    





// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);