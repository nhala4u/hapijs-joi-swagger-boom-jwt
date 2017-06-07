'use strict';

const Joi = require('joi');

(function() {
    const payloadValidator = Joi.object({
        username: Joi.string().alphanum().min(2).max(30).required(),
        password: Joi.string().required()
    })

    function UserValid() {};

    UserValid.prototype.valid = () => {
        return {
            payload: payloadValidator
        };
    }

    module.exports = UserValid;
}());