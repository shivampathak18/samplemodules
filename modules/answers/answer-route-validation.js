var Joi = require('joi');

var objectId = Joi.string();

var instance = Joi.object().keys({

  survey_id: objectId,
  survey_version: Joi.number(),  
  survey_version_id: objectId,

  question_id: objectId,
  question_version: Joi.number(),
  question_version_id: objectId,

  organization_id: objectId,

  text: Joi.string(),
  url: Joi.string(),

  location: Joi.object().keys({
    type: Joi.string(),
    coordinates: Joi.array().items(Joi.number())
  }),

  option_ids: Joi.array().items(Joi.string()),
  type: Joi.array().items(Joi.string()),

  child_question: Joi.boolean(),
  context: Joi.any(),

  timestamp: Joi.date(),
  timestamp_ts: Joi.number(),
  linked_response_id: objectId,
  linked_response_version: Joi.number()

})

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