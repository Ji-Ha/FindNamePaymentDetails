var mongoose = require('mongoose');

var problemSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    content:{type:String},
    answer:{type:String}
  });
  var Problem = mongoose.model('problem', problemSchema);

  module.exports = Problem;