'use strict';

const Joi = require('joi');

const validator = {};

validator.sample = {
  payload: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = validator;
