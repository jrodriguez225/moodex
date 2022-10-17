const axios = require('axios');

const apiCtrl = {};

apiCtrl.signIn = async (req, res) => {
    const { username, password } = req.body;
    const token = await getToken(username, password);
    if (token) {
            res.status(200).json({
                status: 'Signed in',
                token: token
            });
    }
    else {
        res.status(401).json({status: 'Username and password do not match'});
    }
};

async function getToken(username, password) {
    try {
        const response = await axios.get('http://localhost/login/token.php', {
            params: {
                username: username,
                password: password,
                service: 'prueba'
            }
        });
        const token = response.data.token;
        console.log(token);
        return token;
    }
    catch (error) {
        console.error(error);
    }
};

apiCtrl.verifyToken = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            const username = await getUsername(token);
            if (username) {
                req.username = username;
                next();
            }
            else {
                res.status(401).json({status: 'Unauthorized request 3'});
            }
        }
        else {
            res.status(401).json({status: 'Unauthorized request 2'});
        }
    }
    else {
        res.status(401).json({status: 'Unauthorized request 1'});
    }
};

async function getUsername(token) {
    try {
        const response = await axios.get('http://localhost/webservice/rest/server.php', {
            params: {
                wstoken: token,
                wsfunction: 'core_webservice_get_site_info',
                moodlewsrestformat: 'json'
            }
        });
        const username = response.data.username;
        console.log(username);
        return username;
    }
    catch (error) {
        console.error(error);
    }
};

apiCtrl.getPrivate = async (req, res) => {
    const { username } = req;
    res.json(username);
};

module.exports = apiCtrl;