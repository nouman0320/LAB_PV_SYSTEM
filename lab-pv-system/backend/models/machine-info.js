const mongoose = require('mongoose');

const machineInfoSchema = mongoose.Schema({
    lab_id: { type: Number, required: true},
    pr1: { type: Number, required: true},
    pr2: { type: Number, required: true},
    dr1: { type: Number, required: true},
    dr2: { type: Number, required: true},
    ss: { type: Number, required: true}
});

module.exports = mongoose.model('MachineInfo', machineInfoSchema);