const assignmentModel = require('../models').assignment;
const homeworkModel = require('../models').homework;
const authController = require('../controllers/authentication');
const hashConfig = require('../config/hashConfig');

module.exports = {
// need to refactor
    assignHomeworkToStudent(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        if (!req.body) {
            return res.status(401).send({code: 401, message: 'Body was null'});
        }
        if (!req.body.homework_id) {
            return res.status(401).send({code: 401, message: 'Homework_id is required'});
        }
        if (!req.body.students) {
            return res.status(401).send({
                code: 401,
                message: 'No students id were found. Please send list of student ids'
            });
        }
        const validateTokenResponse = authController.validateToken(token);
        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
            const students = req.body.students;
            const failed_ids = [];
            if (students.length) {
                for (const [i, id] of students.entries()) {
                    const assignment = {homework_id: req.body.homework_id, student_id: id, submitted: false};
                    assignmentModel.findOne({
                        where: {
                            student_id: id,
                            homework_id: req.body.homework_id
                        }
                    }).then(response => {
                        if (response) {
                            assignmentModel.update(assignment, {
                                where: {
                                    student_id: id,
                                    homework_id: req.body.homework_id
                                }
                            }).then(response => {
                                if (i === students.length - 1) {
                                    return res.status(201).send({
                                        code: 201,
                                        message: 'homework was assigned to students successfully'
                                    });
                                }
                            })
                                .catch(err => {
                                    console.log(err);
                                    return res.status(401).send({
                                        code: 401,
                                        message: 'Error while assigning homeowrk id ' + req.body.homework_id + ' student id ' + id
                                    });
                                });
                        } else {
                            assignmentModel.create(assignment)
                                .catch(err => {
                                    console.log(err);
                                    return res.status(401).send({
                                        code: 401,
                                        message: 'Error while assigning homeowrk id ' + req.body.homework_id + ' student id ' + id
                                    });

                                });
                        }
                    })
                }
            } else {
                // handling single student id
                const assignment = {homework_id: req.body.homework_id, student_id: req.body.students, submitted: false};
                const id = req.body.students;
                assignmentModel.findOne({where: {student_id: id, homework_id: req.body.homework_id}}).then(response => {
                    if (response) {
                        assignmentModel.update(assignment, {where: {student_id: id, homework_id: req.body.homework_id}})
                            .catch(err => {
                                console.log(err);
                                return res.status(401).send({
                                    code: 401,
                                    message: 'Error while assigning homeowrk id ' + req.body.homework_id + ' student id ' + id
                                });
                            });
                    } else {
                        assignmentModel.create(assignment).then(response => {
                            return res.status(201).send({
                                code: 201,
                                message: 'homework was assigned to students successfully'
                            });
                        })
                            .catch(err => {
                                console.log(err);
                                return res.status(401).send({
                                    code: 401,
                                    message: 'Error while assigning homeowrk id ' + req.body.homework_id + ' student id ' + id
                                });
                            });
                    }
                })

            }


        }
    },

    getAssignmentByStudentId(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        const student_id = req.param('student_id');
        let validateTokenResponse = {isAuthenticated: false, errors: []};
        if (token === hashConfig.student_app_key) {
            validateTokenResponse = {isAuthenticated: true, errors: []};
        } else {
            validateTokenResponse = authController.validateToken(token);
        }
        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
            if (student_id) {
                assignmentModel.belongsTo(homeworkModel, {foreignKey: 'id'});
                homeworkModel.hasMany(assignmentModel, {foreignKey: 'homework_id'});
                return assignmentModel
                    .findAll({where: {student_id: student_id}, include: [homeworkModel]}) // inserting a user into the db by using sequlize model
                    .then(homework_ids => {
                        res.status(201).send({code: 201, data: homework_ids});
                    })
                    .catch(error => {
                        res.status(500).send(error)
                        console.log(error);
                    });//should be handled further by identifying the errors and returning meaning full error code
            } else {
                return res.status(401).send({code: 401, message: 'student_id is required!'});
            }
        }

    },

    submitAssignment(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        if (!req.body) {
            return res.status(401).send({code: 401, message: 'Body was null'});
        } else if (!req.body.submitted) {
            return res.status(401).send({code: 401, message: 'submitted is required!'});
        } else if (!req.body.assignment_id) {
            return res.status(401).send({code: 401, message: 'assignment_id is required!'});
        }
        let validateTokenResponse = {isAuthenticated: false, errors: []};
        if (token === hashConfig.student_app_key) {
            validateTokenResponse = {isAuthenticated: true, errors: []};
        } else {
            validateTokenResponse = authController.validateToken(token);
        }        //validate external token
        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
            return assignmentModel
                .update({submitted: req.body.submitted}, {where: {id: req.body.assignment_id}}) // inserting a user into the db by using sequlize model
                .then(assignment => {
                    // create homework
                    res.status(201).send({code: 201, data: 'Assignment is successfully updated!'});
                })
                .catch(error => {
                    res.status(500).send(error)
                    console.log(error);
                });//should be handled further by identifying the errors and returning meaning full error code
        }
    }
}