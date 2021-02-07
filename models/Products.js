const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String },
    url: { type: String, required: true, unique: true },
    projection: { type: String, required: true },
    timeFormat: { type: [[String]], required: true }
})

module.exports = model('Products', schema)