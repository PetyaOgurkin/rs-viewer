const { Schema, model } = require('mongoose');

const schema = new Schema({
    tile: { type: String, required: true },
    zoom: { type: Number, required: true },
    center: { type: [Number], required: true }
})

module.exports = model('MapSettings', schema)