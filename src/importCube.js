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
        await importCube().then(console.log('Done Importing'))
    }
})

const importCube = async () => {
    var me = new models.User({ email: 'gigasturtz@gmail.com'})
    me.save()
    const importedCube = new models.Cube({owner: me, cards: []}) 
    for (var card in rawData) {
        importedCube.cards.push(await models.Card.findByName(rawData[card]))
    }
    console.log('done finding cards')
   
    await importedCube.save()
}