
require('dotenv').config()
const models = require('./models')
const fs = require('fs')
const rawData = fs.readFileSync('cardData.json')
const eraseDatabaseOnSync = false
const cards = JSON.parse(rawData)

models.connectDB().then(async () => {
    if (eraseDatabaseOnSync) {

        await Promise.all([
            models.Card.deleteMany({})
        ])
        populateDb()
    }
})

const populateDb = async () => {
    for (var object in cards) { 
        const card = new models.Card({card: cards[object]})
        await card.save()
        console.log(cards[object].name)
    }
}