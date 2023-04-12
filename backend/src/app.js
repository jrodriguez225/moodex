const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const communication_login = require('./modules/communication_module/communication_login');
const communication_main = require('./modules/communication_module/communication_main');
const middleware = require('./work_tools/middleware');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
const corsOptions = { origin: 'http://localhost:4200' };
app.use(cors(corsOptions));
app.use(morgan('dev'));

app.use('/auth', communication_login);
app.use('/api', middleware);
app.use('/api/main', communication_main);

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));