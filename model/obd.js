var mongoose = require('mongoose');
var obdSchema = new mongoose.Schema({
    data: String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
mongoose.model('Obd', obdSchema);
