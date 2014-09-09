'use strict';

var Joi = require('joi');
module.exports = {
    create: {
        payload: {
            username: Joi.string().min(6).max(100),
            email: Joi.string().min(8).max(100),
            firstName: Joi.string().min(2).max(100),
            lastName: Joi.string().min(2).max(100)
        }
    },
    get: {
        params: {
            id: Joi.string().min(8)
        }
    },
    update: {
        payload: {
            username: Joi.string().min(6).max(100),
            email: Joi.string().min(8).max(100),
            firstName: Joi.string().min(2).max(100),
            lastName: Joi.string().min(2).max(100)
        }
    },
    delete: {
        params: {
            id: Joi.string().min(8)
        }
    }
};