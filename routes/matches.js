var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
var db = mongoose.connection;
var Match = require('../app/models/match_model.js');
var Team  = require('../app/models/team_model.js');
mongoose.connect("mongodb://localhost:27017/node-demo");

/* GET users listing. */
router.post('/add-match-stat', function(req, res, next) {

  var new_match = new Match({
      _teamOneId:req.body.teamOneId
    , teamOneScore: req.body.teamOneScore
    , _teamTwoId: req.body.teamTwoId
    , teamTwoScore: req.body.teamTwoScore
    , _enabled:true
  });

  new_match.save(function(err, doc){
  		if(err) res.send(err);
  		else    res.send(new_match);
  	});
});

router.get('/', function(req, res, next) {
  var data = [];
  Match.find()
  .populate(['_teamOneId','_teamTwoId'])
  .exec(function(err, stories) {
      res.send(stories);
  });
});


router.delete('/reset', function(req, res, next) {
   db.dropCollection("matches", function (err, result) {
     db.dropCollection("teams", function (err, result) {

       var arr = [{ name: 'Manchester United', shortName:'MU', logoUrl:'https://ssl.gstatic.com/onebox/media/sports/logos/udQ6ns69PctCv143h-GeYw_96x96.png', _enabled:true },
       {  name: 'Real Madrid', shortName:'RM', logoUrl:'https://ssl.gstatic.com/onebox/media/sports/logos/Th4fAVAZeCJWRcKoLW7koA_96x96.png', _enabled:true },
       {  name: 'FC Barcelona', shortName:'FCB', logoUrl:'http://aux.iconspalace.com/uploads/1278105613.png', _enabled:true },
       {  name: 'Bayern Munich', shortName:'BM', logoUrl:'http://aux.iconspalace.com/uploads/bayern-munchen-logo-icon-256.png', _enabled:true },
       {  name: 'Manchester City', shortName:'MC', logoUrl:'https://ssl.gstatic.com/onebox/media/sports/logos/z44l-a0W1v5FmgPnemV6Xw_96x96.png', _enabled:true },
       {  name: 'Arsenal', shortName:'AR', logoUrl:'http://pluspng.com/img-png/arsenal-png-arsenal-fc-logo-png-256.png', _enabled:true },
       {  name: 'Chelsea', shortName:'CH', logoUrl:'http://www.logospng.com/images/88/rosa-chelsea-88836.jpg', _enabled:true },
       {  name: 'Liverpool', shortName:'LI', logoUrl:'https://upload.wikimedia.org/wikipedia/ml/c/cc/Liverpool-FC-Logo-256_%281%29.png', _enabled:true },
       {  name: 'Juventus', shortName:'JU', logoUrl:'http://icons.veryicon.com/png/Sport/Italian%20Football%20Club/Juventus.png', _enabled:true },
       {  name: 'Tottenham Hotspur', shortName:'TH', logoUrl:'http://aux2.iconspalace.com/uploads/tottenham-hotspur-logo-icon-256.png', _enabled:true }];
       console.log(arr);
        Team.insertMany(arr, function(error, docs) {
          console.log(docs);
          res.send(docs);
        });
    });
  });
});



module.exports = router;
