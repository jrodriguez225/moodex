const { Router } = require('express');

const coordination_course = require('../coordination_module/coordination_course');
const response = require('../../work_tools/response');
const utils = require('../../work_tools/utils');

const communication_course = Router();

communication_course.get('/', (req, res) => {
    const { headers, userid } = req;
    const role = headers.role.split(' ')[1];
    const platform = headers.platform.split(' ')[1];
    const token = headers.authorization.split(' ')[1];
    let json = null;
    if (role === 'teacher') {
        coordination_course.getTeacherCourses(platform, token, userid)
            .then((courses) => {
                json = response.getResponse(20001, courses);
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
        json = response.getResponse(40300);
        const status = json.status;
        res.status(status).json(json);
    }
});

communication_course.post('/', (req, res) => {
    const { body, headers } = req;
    let json = null;
    if (body && Object.keys(body).length === 3) {
        const { courseid, coursestartdate, courseenddate } = body;
        if (String(courseid) && String(coursestartdate) && String(courseenddate) &&
            utils.isNaturalNumber(courseid) && utils.isNaturalNumber(coursestartdate) && utils.isNaturalNumber(courseenddate) &&
            courseenddate >= coursestartdate) {
            const role = headers.role.split(' ')[1];
            const platform = headers.platform.split(' ')[1];
            const token = headers.authorization.split(' ')[1];
            if (role === 'teacher') {
                coordination_course.getCourseStudentsCalendarEvents(platform, token, courseid, coursestartdate, courseenddate)
                    .then((data) => {
                        json = response.getResponse(20002, data);
                        const status = json.status;
                        res.status(status).json(json);
                    })
                    .catch((error) => {
                        json = response.getResponse(error);
                        const status = json.status;
                        res.status(status).json(json);
                    });
            }
            else json = response.getResponse(40301);
        }
        else json = response.getResponse(40002);
    }
    else json = response.getResponse(40002);
    if (json) {
        const status = json.status;
        res.status(status).json(json);
    }
});

module.exports = communication_course;