var Joi = require('joi');

var objectId = Joi.string().length(24);

var instance = Joi.object()

exports.post = {
  payload: instance
}

exports.put = {
  params: {
  	id: objectId.required()
  },
  payload: instance
}

exports.getById = {
  params: {
  	id: objectId.required()
  }
}

exports.delete = {
  params: {
  	id: objectId.required()
  }
}