const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    text: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note', noteSchema)