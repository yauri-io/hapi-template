'use strict'

const Joi = require('joi')

const validator = {}

validator.sample = {
  payload: Joi.object().keys({
    name: Joi.string().required()
  })
    .label('Sample payload')
}

module.exports = validator
