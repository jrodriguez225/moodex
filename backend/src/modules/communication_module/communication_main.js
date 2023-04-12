const { Router } = require('express');

const response = require('../../work_tools/response');

const communication_main = Router();

communication_main.get('/', (req, res) => {
    const { username } = req;
    let json = null;
    if (username && typeof username === 'string') {
        json = response.getResponse(20001, { username });
    }
    else {
        json = response.getResponse(40003);
    }
    const status = json.status;
    res.status(status).json(json);
});

module.exports = communication_main;