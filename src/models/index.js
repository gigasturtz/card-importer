const mongoose = require('mongoose')

const Card = require('./card')

const connectDB = () => {
    return mongoose.connect(process.env.DATABASE_URL)
}

module.exports = { connectDB, Card }

