const mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);

const egcrInfoSchema = mongoose.Schema({
    egcr_id: { type: Number},
    lat: { type: Number, required: true},
    lon: { type: Number, required: true}
});

egcrInfoSchema.plugin(AutoIncrement, {id:'egcr_info_seq',inc_field: 'egcr_id'}); // for auto increment ID

module.exports = mongoose.model('EgcrInfo', egcrInfoSchema);