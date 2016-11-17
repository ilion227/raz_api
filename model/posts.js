var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
  name: String,
  description: String,
  enabled: Boolean
});
mongoose.model('Post', postSchema);
