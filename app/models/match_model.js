var mongoose = require('mongoose');
var Schema = mongoose.Schema;

  var matchSchema = new Schema({
   _teamOneId:{ type: Schema.Types.ObjectId, ref: 'teams' },
   teamOneScore:Number,
   _teamTwoId:{ type: Schema.Types.ObjectId, ref: 'teams' },
   teamTwoScore:Number,
   _enabled:Boolean
});
module.exports = mongoose.model('matches', matchSchema);
