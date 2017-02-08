var mongoose = require('mongoose');
var obdSchema = new mongoose.Schema({
    "date": Date,
    "rpm": Number,
    "speed": Number,
    "load": Number,
    "temp": Number
});
mongoose.model('Obd', obdSchema);
