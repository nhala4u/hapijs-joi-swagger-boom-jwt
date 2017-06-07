'use strict';

require('dotenv').config()
const Hapi = require('hapi');
const Boom = require('boom');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const HapiJWT = require('hapi-auth-jwt');
const mongoose = require('mongoose');
const glob = require('glob');
const jwt = require('jsonwebtoken');

const server = new Hapi.Server();
const PORT = process.env.PORT || '8000';
var error = new Error('Unexpected input');

const getUserMethods = require('./app/users').routes;

const options = {
    info: {
        'title': 'API',
        'version': '0.1.0',
    }
};

server.connection({
    host: '127.0.0.1',
    port: PORT
});

// User methods
for (let key in getUserMethods) {
    server.route(getUserMethods[key]);
}

const validate = function(decoded, request, callback) {
    return callback(null, false);
};

server.register([
    Inert,
    Vision,
    HapiJWT,
    {
        'register': HapiSwagger,
        'options': options
    }
], (err) => {

    server.auth.strategy('jwt', 'jwt', 'required', {
        key: process.env.AUTH_CLIENT_SECRET,
        validateFunc: (decoded, request, callback) => callback(null, true),
        verifyOptions: {
            algorithms: ['HS256'],
            audience: process.env.AUTH_CLIENT_ID,
            ignoreExpiration: true
        }
    });

    server.start((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server running at:', server.info.uri);
        }
    });
});