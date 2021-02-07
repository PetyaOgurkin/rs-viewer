const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    url: { type: String, required: true, unique: true },
    startResolution: { type: Number, required: true },
    countOfResolutions: { type: Number, required: true },
    resolutions: { type: [Number] },
    projection: { type: String, required: true },
    extents: { type: [Number], required: true }
})

module.exports = model('Tiles', schema)