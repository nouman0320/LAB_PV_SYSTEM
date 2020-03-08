const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const pvInfoSchema = mongoose.Schema({
    pv_id: { type: Number},
    lat: { type: Number, required: true},
    lon: { type: Number, required: true},
    lab_id: { type: Number, required: true},
    lab_order: { type: String, required: true}
});

pvInfoSchema.plugin(AutoIncrement, {id:'pv_info_seq',inc_field: 'pv_id'}); // for auto increment ID

module.exports = mongoose.model('PvInfo', pvInfoSchema);