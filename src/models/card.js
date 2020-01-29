const mongoose = require('mongoose')


const cardSchema = new mongoose.Schema({
    card: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card 