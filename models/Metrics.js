const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const metricsSchema = new Schema({
    googleId: {type:String, required: true},
    siteMetrics: {type: Array, required: true}
})

mongoose.model('metrics', metricsSchema)
