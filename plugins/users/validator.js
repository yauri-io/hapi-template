import Joi from 'joi'

const userValidator = {}

userValidator.getById = {
  params: Joi.object({
    id: Joi.number().positive().required()
  })
}

userValidator.create = {
  payload: Joi.object()
    .keys({
      fName: Joi.string().required(),
      lName: Joi.string().required(),
      age: Joi.number().positive().required()
    })
    .label('Create user payload')
}

export default userValidator
