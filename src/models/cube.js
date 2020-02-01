const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    owner: {  type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }]
})

const Cube = mongoose.model('Cube', cubeSchema)

module.exports = Cube