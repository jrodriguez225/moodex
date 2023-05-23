const moodle = require('../../work_tools/moodle');

const data_token = {};

data_token.getToken = async (username, password, service) => {
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

module.exports = data_token;