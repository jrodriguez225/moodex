const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(express.json());
const corsOptions = {origin: 'http://localhost:4200'};
app.use(cors(corsOptions));
app.use(morgan('dev'));

// routes
app.use('/api', require('./routes/api.routes'));

module.exports = app;