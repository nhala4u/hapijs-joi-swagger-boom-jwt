'use strict';

const HANDLER = require('./handler');
const VALIDATE = require('./validates');

const userHandler = new HANDLER();
const userValid = new VALIDATE();

module.exports = () => {
    return [{
        method: userHandler.GET().method,
        path: userHandler.GET().path,
        config: {
            handler: userHandler.GET().handle,
            description: 'User GET method',
            notes: 'User GET method',
            tags: ['api', 'members', 'users']
        }
    }, {
        method: userHandler.POST().method,
        path: userHandler.POST().path,
        config: {
            validate: userValid.valid(),
            handler: userHandler.POST().handle,
            description: 'User POST method',
            notes: 'User POST method',
            tags: ['api', 'members', 'users']
        }
    }, {
        method: userHandler.PUT().method,
        path: userHandler.PUT().path,
        config: {
            handler: userHandler.PUT().handle,
            description: 'User PUT method',
            notes: 'User PUT method',
            tags: ['api', 'members', 'users']
        }
    }, {
        method: userHandler.DELETE().method,
        path: userHandler.DELETE().path,
        config: {
            handler: userHandler.DELETE().handle,
            description: 'User DELETE method',
            notes: 'User DELETE method',
            tags: ['api', 'members', 'users']
        }
    }, {
        method: userHandler.LOGIN().method,
        path: userHandler.LOGIN().path,
        config: {
            auth: false,
            pre: userHandler.LOGIN().pre,
            validate: userValid.valid(),
            handler: userHandler.LOGIN().handle,
            description: 'User LOGIN method',
            notes: 'User LOGIN method',
            tags: ['api', 'members', 'users']
        }
    }]
};