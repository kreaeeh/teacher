const authController = require('../controllers').authentication;
const homeworkController = require('../controllers').homework;
const assignmentController = require('../controllers').assignment;
const studentController = require('../controllers').student;

module.exports = (app) => {

    app.get('/', (req, res) => res.status(200).send({
        message: 'Welcome to the our API!',
    }));
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Welcome to the our API!',
    }));


    //Authentication
    app.post('/api/auth/register', (req, res) => {
        authController.createUser(req, res);
    })
    app.post('/api/auth/login', authController.findOne)

    //logout not needed beccause token can be removed from front-end). However, it is needed when server need to maintian multiple sessions
    app.get('/api/auth/logout', (req, res) => res.status(200).send({
        auth: false,
        token: null,
        message: 'Logout successfully!'
    }));
    app.get('/api/auth/profile', authController.getProfile)
    app.post('/api/homework', (req, res) => {
        homeworkController.createHomework(req, res);
    })
    app.get('/api/homework', (req, res) => {
        homeworkController.getHomework(req, res);
    })
    app.post('/api/assignment', (req, res) => {
        assignmentController.assignHomeworkToStudent(req, res);
    })
    app.get('/api/assignment', (req, res) => {
        assignmentController.getAssignmentByStudentId(req, res);
    })
    app.put('/api/assignment', (req, res) => {
        assignmentController.submitAssignment(req, res)
    })
    app.get('/api/student', (req, res) => {
        studentController.getStudentList(req, res);
    })
    //

};