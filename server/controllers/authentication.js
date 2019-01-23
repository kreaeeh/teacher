const User = require('../models/').user;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/hashConfig');

const validateToken = (token) => {
    console.log(token);
    const obj = {isAuthenticated: false, message: ''}
    if (!token) {
        obj.message = 'No token was provided!';
        return obj;
    } else {
        return jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                obj.message = 'Invalid token!'
                return obj;
            } else {
                obj.isAuthenticated = true;
                obj['decoded'] = decoded;
                return obj;
            }
        })
    }
}

module.exports = {
    createUser(req, res) {
        // Check if user exists
        const validation = this.validateRegistration(req.body);
        if (!validation.isAuthenticated) {
            return res.status(401).send({auth: false, token: null, message: validation.errors});
        } else {
            return User
                .findOne({where: {email: req.body.email}}) // inserting a user into the db by using sequlize model
                .then(user => {
                    if (user) {
                        // user already exists
                        return res.status(401).send({auth: false, token: null, message: 'Email already exists!'});
                    } else {
                        User.create(req.body).then(user => {
                            // create a token
                            const token = jwt.sign({id: user.id, email: user.email, name: user.name}, config.secret, {
                                expiresIn: 86400 // expires in 24 hours
                            });
                            res.status(201).send({auth: true, token: token});
                        })
                            .catch(error => {
                                res.status(500).send(error)
                                console.log(error);
                            });//should be handled further by identifying the errors and returning meaning full error code
                    }
                })
                .catch(error => {
                    res.status(500).send(error)
                    console.log(error);
                });//should be handled further by identifying the errors and returning meaning full error code

        }

    },
    findOne(req, res) {
        if (!req.body.email) {
            return res.status(401).send({auth: false, token: null, message: 'No username nor email is provided'});
        }
        return User
            .findOne({where: {email: req.body.email}})
            .then(user => {
                if (!user) {
                    return res.status(401).send({auth: false, token: null, message: 'Wrong username or password'});
                }
                // Validate password
                const passwordisAuthenticated = bcrypt.compareSync(req.body.password, user.password);
                if (!passwordisAuthenticated) return res.status(401).send({
                    auth: false,
                    token: null,
                    message: 'Wrong username or password'
                });
                const token = jwt.sign({id: user.id, email: user.email, name: user.name}, config.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                return res.status(201).send({auth: true, token: token});
            })
            .catch(error => {
                console.log(error);
                res.status(500).send(error)
            });//should be handled further by identifying the errors and returning meaning full error code

    },
    getProfile(req, res) {
        console.log('here');
        const token = req.headers['x-access-token'];
        console.log(token);
        if (!token) return res.status(401).send({auth: false, message: 'No token provided.'});
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(403).send({auth: false, message: 'Failed to authenticate token.'})
            } else {
                seller.findById(decoded.id, {attributes: ['id', 'username', 'email', 'name', 'contact', 'country', 'passport']})
                    .then(seller => {
                        if (seller) {
                            return res.status(200).send(seller)
                        } else {
                            return res.status(404).send("no user found")
                        }
                    })
                    .catch(err => {
                        return res.status(500).send(err)
                    })
            }

        });

    },
    validateRegistration(body) {
        const validateObj = {isAuthenticated: false, errors: []};
        if (body) {
            if (!body.email) {
                validateObj['errors'].push('Email is null')
            } else if (!body.name) {
                validateObj['errors'].push('Name is null')
            } else if (!body.password) {
                validateObj['errors'].push('Password is null')
            } else {
                    validateObj['isAuthenticated'] = true;
                    return validateObj;
            }
        } else {
            validateObj['errors'].push('Body is null')
        }
        return validateObj;
    },
    validateToken

};