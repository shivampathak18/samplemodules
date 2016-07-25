var Joi = require('joi');

var objectId = Joi.string();

var instance = Joi.object().keys({
  survey_id : objectId,
  survey_version: Joi.number(),
  survey_version_id : objectId,

  device: Joi.any(),


  answers : Joi.array().items(Joi.any()),

  organization_id: objectId,

  app_version : Joi.number(),
  
  remote_ip: Joi.string(),
  user_id: objectId,
  browser_user_agent: Joi.string(),
  modified_time : Joi.date(),
  modified_time_ts: Joi.number(),
  client_id: Joi.string(),

  time_taken : Joi.number(),

  linked_response : Joi.array().items(Joi.object().keys({
    _id : objectId,
    version : Joi.number(),
    response_id : objectId,
    order : Joi.number() 
  })),

  version : Joi.number(),

  response_id : objectId,

  baseline_response : Joi.object().keys({
    _id : objectId,
    version : Joi.number(),
    response_id : objectId,
    index : Joi.object()
  }),

  state: Joi.array().items(Joi.string()),
  flagged : Joi.boolean(),
  location: Joi.object().keys({
    type: Joi.string(),
    coordinates: [Joi.any()]
  }),
  online : Joi.boolean(),
  created_on : Joi.date(),
  created_on_ts : Joi.number()

});

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

exports.getFlaggedResponseCountForUserPerSurvey = {
  query: {
    user_id: objectId
  }
}

exports.getResponseCountByUser = {
  query: {
    user_id: objectId
  }
}

exports.getResponseTypesByUserPerSurvey = {
  query: {
    user_id: objectId
  }  
}

exports.getResponseCountForUserPerDate = {

  query: {
    user_id: objectId,
    from_date: Joi.date(),
    to_date: Joi.date()
  }
  
}

exports.getResponseCountForUserPerSurvey = {
  query: {
    user_id: objectId,
    from_date: Joi.date(),
    to_date: Joi.date()
  }

}

exports.getAverageDailyResponseCount = {
  query: {
    organization_id: objectId,
    from_date: Joi.date(),
    to_date: Joi.date()
  }
}

exports.getSurveyWiseResponseCountByDate = {

  query: {
    organization_id: objectId,
    from_date: Joi.date(),
    to_date: Joi.date()
  } 

}

exports.getForcedvsRegularResponseCount = {

  query: {
    organization_id: objectId,
    from_date: Joi.date(),
    to_date: Joi.date()
  } 

}
