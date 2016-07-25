var Joi = require('joi');

var objectId = Joi.string();

var instance = Joi.object().keys({

  survey_id: objectId,
  title: Joi.string(),
  title_i8ln: Joi.object(),

  description: Joi.string(),
  description_i8ln: Joi.object(),

  type: Joi.string(),
  creator: objectId,
  organization_id: objectId,

  state: Joi.string(),

  published_on: Joi.date(),
  published_ts: Joi.number(),

  sector: Joi.string(),

  questions: Joi.array().items(objectId),

  live: Joi.boolean(),

  live_details: Joi.array().items(Joi.object().keys({
    start: Joi.date(),
    start_ts: Joi.number(),
    end: Joi.date(),
    end_ts: Joi.number()
  })),

  // Versioning
  version: Joi.number(),
  version_comment: Joi.string(),
  head: Joi.boolean(),

  journal: Joi.array().items(Joi.object().keys({
    remote_ip: Joi.string(),
    user_agent: Joi.string(),
    client_id: Joi.string(),
    user_id: objectId,
    modified_time: Joi.date(),
    modified_time_ts: Joi.number(),
    changelog: [Joi.object()]
  })),

  last_modified: Joi.date(),
  last_modified_ts: Joi.number()

}

);

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

exports.getSurveyCountByOrganization = {

  query: {
    organization_id: objectId,
    from_date: Joi.date(),
    to_date: Joi.date()
  } 

}