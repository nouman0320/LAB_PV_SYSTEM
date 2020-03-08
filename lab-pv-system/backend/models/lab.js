const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const labSchema = mongoose.Schema({
    lab_id: { type: Number},
    lat: { type: Number, required: true},
    lon: { type: Number, required: true},
    city: { type: String, required: true},
    area: { type: String, required: true},
    phase: { type: String, required: true},
    st: { type: String, required: true},
    s_st: { type: String, required: true},
    building: { type: String, required: true},
    floor: { type: String, required: true}
});

labSchema.plugin(AutoIncrement, {id:'lab_seq',inc_field: 'lab_id'}); // for auto increment ID

module.exports = mongoose.model('Lab', labSchema);