var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;

  var teamSchema = new Schema({
   name:{type:String, unique: true, index: true,required: true  ,lowercase: true, trim: true },
   shortName:String,
   logoUrl:String,
   _enabled:Boolean
},{strict: true});

teamSchema.plugin(uniqueValidator, { message: 'Team {VALUE} already exists.' });
module.exports = mongoose.model('teams', teamSchema);
