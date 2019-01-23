const homeworkModel = require('../models').homework;
const authController = require('../controllers/authentication');


module.exports = {
    /**
     * Function/Module Name : createHomework
     * Purpose : this function is for the teacher to create a homework
     * Input: request, response
     * Output :  {code : 200 /400, data: []}
     **/
    createHomework(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        if (!req.body) {
            return res.status(401).send({code: 401, message: 'Body was null'});
        }
        const validateTokenResponse = authController.validateToken(token);
        if(!validateTokenResponse.isAuthenticated){
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        }else {
            const body = req.body;
            // get user id from token and add it to the body sent by the request
            body['teacher_id'] = validateTokenResponse.decoded.id;

            return homeworkModel
                .create(body) // inserting a user into the db by using sequlize model
                .then(homework => {
                    // create homework
                    res.status(201).send({code: 201, data: homework});
                })
                .catch(error => {
                    res.status(500).send(error)
                    console.log(error);
                });//should be handled further by identifying the errors and returning meaning full error code
        }
    },
    /**
     * Function/Module Name : getHomework
     * Purpose : this function is to get one or many homeworks
     * Input: request, response
     * Output :  {code : 200 /400, data: []}
     **/
    getHomework(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        const homework_id = req.param('id');
        const validateTokenResponse = authController.validateToken(token);
        if(!validateTokenResponse.isAuthenticated){
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        }else {
            if(homework_id){
                return homeworkModel
                    .findById(homework_id) // inserting a user into the db by using sequlize model
                    .then(homeworks => {
                        // get one homework
                        res.status(201).send({code: 201, data: homeworks});
                    })
                    .catch(error => {
                        res.status(500).send(error)
                        console.log(error);
                    });//should be handled further by identifying the errors and returning meaning full error code
            }else{
                return homeworkModel
                    .findAll() // inserting a user into the db by using sequlize model
                    .then(homeworks => {
                        // get all homeworks
                        res.status(201).send({code: 201, data: homeworks});
                    })
                    .catch(error => {
                        res.status(500).send(error)
                        console.log(error);
                    });//should be handled further by identifying the errors and returning meaning full error code
            }

        }
    }


}