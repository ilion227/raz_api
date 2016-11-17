var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
    contentCategory: String,
    lang: String,
    priority: Number,
    title: String,
    description: String,
    category: String,
    section: String,
    chainage: Number,
    lat: Number,
    lon: Number,
    roadPriority: Number,
    isRoadClosed: Boolean,
    contentName: String,
    borderCrossing: Boolean,
    road: String,
    eventValidFrom: String,
    eventValidUntil: String,
    updated_at: String
});
mongoose.model('Event', eventSchema);
