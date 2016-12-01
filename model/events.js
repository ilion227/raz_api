var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
    content_category: String,
    priority: Number,
    title: String,
    description: String,
    road_type: String,
    section: String,
    chainage: Number,
    lat: Number,
    lon: Number,
    road_priority: Number,
    is_road_closed: Boolean,
    content_name: String,
    border_crossing: Boolean,
    road: String,
    updated_at: String,
    status: {
        valid_from: String,
        valid_until: String,
        active: { type: Boolean, default: true }
    },
    event_id: { type: Number, index: { unique: true, dropDups: true }}
});
mongoose.model('Event', eventSchema);
