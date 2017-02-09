var express = require('express');
var router = express.Router();
bodyParser = require('body-parser');

var mongoose = require('mongoose');

var theatreSchema = mongoose.Schema({
	theatreName: String,																																																							+++++
	cityName: String,
  moviTitle: String
});

var Theatre = mongoose.model('Theatre',theatreSchema,'theatre');

router.get('/getTheatre', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Theatre.find({}, function (err, docs) {
         res.json(docs);
    });
});

router.get('/getTheatre/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Theatre.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addTheatre', function(req, res){

var theatre = new Theatre({
  theatreName : req.body.theatreName,
  cityName: req.body.cityName,
  moviTitle:req.body.moviTitle
  });
    theatre.save(function(err, docs){
     if ( err ) throw err;
     console.log("Theatre Saved Successfully");
    res.json(docs);
});

});

router.delete('/deleteTheatre/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Theatre.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
});

router.put('/updateTheatre/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
   Theatre.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      res.json(data);
    });
});

router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
