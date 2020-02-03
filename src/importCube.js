require('dotenv').config()
const models = require('./models')
const fs = require('fs')
const eraseDatabaseOnSync = true
const rawData = fs.readFileSync('nicks_cube.txt').toString().split('\r\n')

models.connectDB().then(async () => {
    if(eraseDatabaseOnSync) {
        await Promise.all([
            models.Cube.deleteMany({}),
            models.User.deleteMany({})
        ])
        await importCube()
    }
})

const importCube = async () => {
    var me = new models.User({ email: 'gigasturtz@gmail.com'})
    me.save()
    const importedCube = new models.Cube({owner: me, cards: []}) 
    for (var card in rawData) {
        var foundCard = await models.Card.findByName(rawData[card])
        if(foundCard){
             importedCube.cards.push(foundCard)
             console.log("Added ", rawData[card])
        }
        else console.log("Couldn't find ", rawData[card])
    }
    console.log('done finding cards')
   
    await importedCube.save()
}