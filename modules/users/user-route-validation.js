var Joi = require('joi');

var objectId = Joi.string().length(24);

var instance = Joi.object().keys(

);

exports.post = {
  payload: instance
}

exports.put = {
  params: objectId.required(),
  payload: instance
}

exports.getById = {
  params: objectId.required()
}

exports.delete = {
  params: objectId.required()
}