const config = require('../config/app');
const mongoose = require('mongoose');

const URL = config.DATABASE.URL
const PORT = config.DATABASE.PORT
const DATABASE_NAME = config.DATABASE.DATABASE_NAME

const CONNECTION_STRING = `${URL}:${PORT}/${DATABASE_NAME}`

const connectDB = async () => {
    await mongoose.connect(CONNECTION_STRING, {
        useNewUrlParser: true
    })
    console.log(`Establishing connection for database: ${DATABASE_NAME} || with URL ${CONNECTION_STRING}`);
}
module.exports = connectDB;