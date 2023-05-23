const { Router } = require('express');

const utils = require('./utils');
const moodle = require('./moodle');
const response = require('./response');

const middleware = Router();

middleware.use('/', async (req, res, next) => {
    let json = null;
    try {
        const { authorization, expiration } = req.headers;
        const roleHeader = req.headers.role;
        if (authorization && roleHeader && expiration &&
            utils.headerFormat(authorization) && utils.headerFormat(roleHeader) && utils.headerFormat(expiration)) {
            const token = authorization.split(' ')[1];
            const role = roleHeader.split(' ')[1];
            const tokenValidity = expiration.split(' ')[1];
            if (token && role && tokenValidity &&
                typeof token === 'string' &&
                (role === 'manager' || role === 'editingteacher' || role === 'teacher') &&
                utils.isISOString(tokenValidity)) {
                const userid = await moodle.getUserid(token);
                if (userid) {
                    if (!(tokenValidity < new Date().toISOString())) {
                        req.userid = userid;
                        next();
                    }
                    else json = response.getResponse(40102);
                }
                else json = response.getResponse(40101);
            }
            else json = response.getResponse(40001);
        }
        else json = response.getResponse(40001);
        if (json) {
            const status = json.status;
            res.status(status).json(json);
        }
    }
    catch (error) {
        json = response.getResponse(50001);
        const status = json.status;
        res.status(status).json(json);
    }
});

module.exports = middleware;