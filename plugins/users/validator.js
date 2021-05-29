'use strict';

const Joi = require('@hapi/joi');

const userValidator = {};

userValidator.getById = {
  params: Joi.object({
    id: Joi.number().positive().required(),
  }),
};

userValidator.create = {
  payload: Joi.object().keys({
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    age: Joi.number().positive().required(),
  }),
};

module.exports = userValidator;
