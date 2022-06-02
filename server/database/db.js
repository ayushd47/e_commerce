const config = require('../config/app');
const mongoose = require('mongoose');

const URL = config.DATABASE.MONGO.URL
const PORT = config.DATABASE.MONGO.PORT
const DATABASE_NAME = config.DATABASE.MONGO.DATABASE_NAME

const CONNECTION_STRING = `${URL}:${PORT}/${DATABASE_NAME}`

const connectDB = async () => {
    await mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true
    })
    console.log('------------------------------------------------------------------------------------------------------')
    console.log(`Establishing connection for database: ${DATABASE_NAME} || with URL ${CONNECTION_STRING}`);
};
module.exports = connectDB;