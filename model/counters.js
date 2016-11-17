var mongoose = require('mongoose');
var counterSchema = new mongoose.Schema({
  updated_at: Date,
  data: {
    category: String,
    lang: String,
    items: [
      {
        priority: Number,
        title: String,
        description: String,
        category: String,
        section: String,
        chainage: Number,
        lat: Number,
        lon: Number,
        roadPriority: Number,
        roadClosed: Boolean,
        contentName: String,
        borderCrossing: Boolean,
        road: String,
        eventValidUntil: Date,
        updated_at: Date
      }
    ]
  }
});
mongoose.model('Counter', counterSchema);
