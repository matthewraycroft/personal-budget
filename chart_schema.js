const mongoose = require("mongoose")

const chartSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
        trim: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
        trim:true
    },
    budget: {
        type: Number,
        required: true,
    }
}, {collection: 'chart_data'})

module.exports = mongoose.model('chart_data', chartSchema)