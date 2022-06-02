require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const config = require('./config/index')
const ConnectDB = require('./')
