const moodle = require('../../work_tools/moodle');

const data_login = {};

data_login.getToken = async (username, password, service) => {
    try {
        const url = 'http://localhost/login/token.php';
        const params = {
            params: {
                username,
                password,
                service
            }
        };
        return await moodle.get(url, params);
    }
    catch (error) {}
};

module.exports = data_login;