'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [{
            name: 'admin',
            email: 'admin@teacher.io',
            password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa', //default password is 1122
            createdAt: new Date().toISOString().slice(0, 10),
            updatedAt: new Date().toISOString().slice(0, 10)

        },
            {
                name: 'rahman',
                email: 'rahman@teacher.io',
                password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10)


            },
            {
                name: 'abdullah',
                email: 'abdullah@teacher.io',
                password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10)

            },
            {
                name: 'omar',
                email: 'omar@teacher.io',
                password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10)


            },
            {
                name: 'ali',
                email: 'ali@teacher.io',
                password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa' ,//default password is 1122,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10)

            },
            {
                name: 'ahmad',
                email: 'ahmad@teacher.io',
                password: '$2a$10$6Jzqlt./ycRqg5Kmz2E3jOVx6vITXTD48KEaM9VwmnC877TVMgjAa', //default password is 1122,
                createdAt: new Date().toISOString().slice(0, 10),
                updatedAt: new Date().toISOString().slice(0, 10)

            }], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
