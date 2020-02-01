const mongoose = require('mongoose')

const Card = require('./card')
const Cube = require('./cube')
const User = require('./user')

const connectDB = () => {
    console.log("connecting to : ", process.env.DATABASE_URL)
    return mongoose.connect(process.env.DATABASE_URL)
}

module.exports = { connectDB, Card, Cube, User }

