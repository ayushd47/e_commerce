require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const config = require('./config/index')
const ConnectDB = require('./database/db');
const { connect } = require('http2');
const connectDB = require('./database/db');

//connect DB
connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(hpp());

const port = config.env.LOCAL_URL.PORT;
const url = config.env.LOCAL_URL.URL;
const env = config.env.LOCAL_URL.ENV;
const app_name = config.env.LOCAL_URL.APP_NAME;
const path = require('path');

const server = http.createServer(app);

var corsOptions = {
    origin: ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:3001'],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/views/index.html'));
})

app.set('PORT', port)

server.listen(port, () => {
    console.log(`Sever is starting at port ${port} || SUCCESS`)
    console.log(`Hosting at ${url}:${port} || SUCCESS`);
    console.log(`${app_name} is running om env ${env} || SUCCESS`)
    console.log('------------------------------------------------------------------------------------------------------')
})

process.on("unhandledRejection", (err, promise) => {
    console.log(`logged Error : ${err}`)
    server.close(() => process.exit(1));
})

