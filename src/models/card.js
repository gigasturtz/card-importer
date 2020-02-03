const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    card: {
        type: Map,
        of: mongoose.Schema.Types.Mixed
    }
})

cardSchema.statics.findByName = async function (cardToFind){
    var query = {}
    var queryParam = 'card.name'
    query[queryParam] = cardToFind
    var card = await this.findOne(query)
    if (!card) {
        console.log("using regex")
        card = await this.findOne({ 
            'card.name': { '$regex': cardToFind, '$options': 'i' }  
        })
    }
    if (card){
    return card
    }
}

const Card = mongoose.model('Card', cardSchema)

module.exports = Card 