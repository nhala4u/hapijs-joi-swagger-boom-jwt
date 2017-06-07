'use strict';
const jwt = require('jsonwebtoken');
const Boom = require('boom');

(function() {
    const _username = process.env.username;
    const _password = process.env.password;

    function UserData() {

    };

    UserData.prototype.GET = () => {
        return {
            method: 'GET',
            path: '/api/users',
            handle: (request, reply) => {
                console.log('Method GET')
            }
        }
    };
    // Login
    UserData.prototype.LOGIN = () => {
        return {
            method: 'POST',
            path: '/login',
            pre: [{
                assign: 'users',
                method: (request, reply) => {
                    const profileClient = {
                        username: request.payload.username,
                        password: request.payload.password
                    }
                    const jwtSign = jwt.sign(profileClient, process.env.AUTH_CLIENT_SECRET);
                    const jwtVerify = jwt.verify(jwtSign, process.env.AUTH_CLIENT_SECRET, function(err, token) {
                        if (err) {
                            console.log(err);
                            Boom.badRequest(err, 404);
                        } else {
                            if (token.username === _username && token.password === _password) {
                                console.log('Welcome: ' + token.username);
                            } else {
                                console.log('Your username or Password incorrect ! Try again PRE');
                                Boom.unauthorized('invalid password');
                            };
                        }
                    });
                    reply(request);
                }
            }],
            handle: (request, reply) => {
                // console.log(request.pre.assign);
                return reply(request.pre.users + '\n');
                // reply({ text: 'Your username or Password incorrect ! Try again' }).header("Authorization", request.headers.authorization);
            }
        }
    };

    UserData.prototype.POST = () => {
        return {
            method: 'POST',
            path: '/api/users',
            handle: (request, reply) => {
                reply('API server running hapi!');
                // if (_username === request.payload.username &&
                //     _password === request.payload.password)
                //     reply('Welcome: ' + request.payload.username)
                // else
                //     reply('Your username or Password incorrect ! Try again')
            }
        }
    };

    UserData.prototype.PUT = () => {
        return {
            method: 'PUT',
            path: '/api/users/{id}',
            handle: (request, reply) => {
                console.log('Method  PUT')
            }
        }
    };

    UserData.prototype.DELETE = () => {
        return {
            method: 'DELETE',
            path: '/api/users/{id}',
            handle: (request, reply) => {
                console.log('Method  DELETE')
            }
        }
    };

    module.exports = UserData;
}());