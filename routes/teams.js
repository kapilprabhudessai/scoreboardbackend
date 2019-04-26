var express = require('express');
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;
var Team  = require('../app/models/team_model.js');
mongoose.connect("mongodb://localhost:27017/node-demo");
var multer = require('multer')
var cors = require('cors');
/* GET users listing. */
app.use(cors())
var storage = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
})
var upload = multer({ storage: storage }).single('file')
router.post('/', function(req, res, next) {
  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }

         const parse = require("mongoose-error-parser");

         var new_team = new Team({
             name:req.body.team_name
           , shortName: req.body.team_name
           , logoUrl: req.protocol + '://' + req.get('host')+'/images/'+req.file.filename
           , _enabled:true
         });


         new_team.save(function(err, doc){

            if(err) res.send({status:'failure', error_message:parse(err).errors[0].message});
            else    res.send({status:'success',payload:new_team});
          });

  })
});

router.get('/', function(req, res, next) {
  var data = [];
  Team.find().exec(function(err, teams) {
      res.send(teams);
  });
});





module.exports = router;
