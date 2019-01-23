const homeworkModel = require('../models').homework;
const authController = require('../controllers/authentication');
const hashConfig = require('../config/hashConfig');
const rp = require('request-promise');

module.exports = {
    /**
     * Function/Module Name : getStudentList
     * Purpose : this function is to get student list from the student app
     * Input: request, response
     * Output :  {code : 200 /400, data: []}
     **/
    getStudentList(req, res) {
        // Check if user exists
        const token = req.headers['x-access-token'];
        let validateTokenResponse = authController.validateToken(token);

        if (!validateTokenResponse.isAuthenticated) {
            return res.status(403).send({code: 403, message: validateTokenResponse.message});
        } else {
            const options = {
                uri: 'http://127.0.0.1:8000/api/student',
                method: 'GET',
                headers: {
                    'x-access-token': hashConfig.teacher_app_key
                },
                body: req.body,
                json: true // Automatically parses the JSON string in the response
            };

            // Make request to teacher app to get all homework by student id
            rp(options)
                .then(function (response) {
                    return res.status(response.code).send(response);
                })
                .catch(function (err) {
                    // Crawling failed...
                    if(err.error.code){
                        return res.status(err.error.code).send(err.error);
                    }else{
                        return res.status(500).send({code: 500, message: 'Internal server error!'});
                    }
                });
            }
        }

}