const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const communication_login = require('./modules/communication_module/communication_login');
const middleware = require('./work_tools/middleware');
const communication_courses = require('./modules/communication_module/communication_courses');
const response = require('./work_tools/response');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(morgan('dev'));

app.use('/auth', communication_login);
app.use('/api', middleware);
app.use('/api/courses', communication_courses);
app.all('*', (req, res) => {
    const json = response.getResponse(40400);
    const status = json.status;
    res.status(status).json(json);
});

app.listen(app.get('port'), () => console.log(`Server on port ${app.get('port')}`));