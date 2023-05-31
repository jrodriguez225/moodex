const { Router } = require('express');

const cooordination_courses = require('../coordination_module/coordination_courses');
const response = require('../../work_tools/response');
const utils = require('../../work_tools/utils');

const communication_courses = Router();

communication_courses.get('/', (req, res) => {
    const { headers, userid } = req;
    const role = headers.role.split(' ')[1];
    const token = headers.authorization.split(' ')[1];
    let json = null;
    if (role === 'editingteacher' || role === 'teacher') {
        cooordination_courses.getTeacherCourses(token, userid)
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

communication_courses.post('/', (req, res) => {
    const { body, headers } = req;
    let json = null;
    if (body && Object.keys(body).length === 3) {
        const { courseid, coursestartdate, courseenddate } = body;
        if (String(courseid) && String(coursestartdate) && String(courseenddate) &&
            utils.isNaturalNumber(courseid) && utils.isNaturalNumber(coursestartdate) && utils.isNaturalNumber(courseenddate) &&
            courseenddate >= coursestartdate) {
            const role = headers.role.split(' ')[1];
            const token = headers.authorization.split(' ')[1];
            if (role === 'editingteacher' || role === 'teacher') {
                cooordination_courses.getCourseStudentsCalendarEvents(token, courseid, coursestartdate, courseenddate)
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

module.exports = communication_courses;