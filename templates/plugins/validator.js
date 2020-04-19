'use strict';

const Joi = require('@hapi/joi');

const validator = {};

validator.sample = {
  payload: Joi.object().keys({
    name: Joi.string().required()
  })
};

module.exports = validator;
