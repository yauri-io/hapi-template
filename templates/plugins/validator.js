import Joi from 'joi'

const validator = {}

validator.sample = {
  payload: Joi.object()
    .keys({
      name: Joi.string().required()
    })
    .label('Sample payload')
}

export default validator
