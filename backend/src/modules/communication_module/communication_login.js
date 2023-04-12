const { Router } = require('express');

const coordination_login = require('../coordination_module/coordination_login');
const response = require('../../work_tools/response');

const communication_login = Router();

communication_login.post('/', (req, res) => {
    const { username, password } = req.body;
    let json = null;
    if (username && password && typeof username === 'string' && typeof password === 'string') {
        coordination_login.login(username, password)
            .then((data) => {
                if (data) json = response.getResponse(20000, data);
                else json = response.getResponse(40100);
                const status = json.status;
                res.status(status).json(json);
            })
            .catch((error) => {
                json = response.getResponse(error);
                const status = json.status;
                res.status(status).json(json);
            });
    }
    else {
        json = response.getResponse(40000);
        const status = json.status;
        res.status(status).json(json);
    }
});

module.exports = communication_login;