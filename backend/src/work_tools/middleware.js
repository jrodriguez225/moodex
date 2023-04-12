const { Router } = require('express');

const moodle = require('./moodle');
const response = require('./response');

const middleware = Router();

middleware.use('/', async (req, res, next) => {
    let json = null;
    try {
        const { authorization, expiration } = req.headers;
        const roleHeader = req.headers.role;
        if (authorization && roleHeader && expiration) {
            const token = authorization.split(' ')[1];
            const role = roleHeader.split(' ')[1];
            const tokenValidity = expiration.split(' ')[1];
            if (token && role && tokenValidity && typeof token === 'string' && typeof role === 'string' && typeof tokenValidity === 'string') {
                const username = await moodle.getUsername(token);
                if (username) {
                    if (role === 'manager' || role === 'editingteacher' || role === 'teacher') {
                        if (!expiredToken(tokenValidity)) {
                            req.username = username;
                            next();
                        }
                        else json = response.getResponse(40103);
                    }
                    else json = response.getResponse(40102);
                }
                else json = response.getResponse(40101);
            }
            else json = response.getResponse(40002);
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

function expiredToken (tokenValidity) {
    const currentDateTime = new Date().toISOString();
    return tokenValidity < currentDateTime;
};

module.exports = middleware;