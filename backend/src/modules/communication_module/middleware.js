const { Router } = require('express');

const utils = require('../../work_tools/utils');
const data_user = require('../data_module/data_user');
const response = require('../../work_tools/response');

const middleware = Router();

middleware.use('/', async (req, res, next) => {
    let json = null;
    try {
        const platformHeader = req.headers.platform;
        const { authorization, expiration } = req.headers;
        const roleHeader = req.headers.role;
        if (platformHeader && authorization && roleHeader && expiration &&
            utils.headerFormat(platformHeader) && utils.headerFormat(authorization) && utils.headerFormat(roleHeader) && utils.headerFormat(expiration)) {
            const platform = platformHeader.split(' ')[1];
            const token = authorization.split(' ')[1];
            const role = roleHeader.split(' ')[1];
            const tokenValidity = expiration.split(' ')[1];
            if (platform && token && role && tokenValidity &&
                utils.urlFormat(platform) &&
                typeof token === 'string' &&
                (role === 'manager' || role === 'teacher') &&
                utils.isISOString(tokenValidity)) {
                const userid = await data_user.getUserid(platform, token);
                if (userid) {
                    if (tokenValidity >= new Date().toISOString()) {
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