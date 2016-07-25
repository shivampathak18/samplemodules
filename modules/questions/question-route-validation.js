var Joi = require('joi');


var objectId = Joi.string();

var instance = Joi.object().keys({
  survey_id : objectId,
  survey_version_id : objectId,

  required : Joi.boolean(),

  metadata : Joi.object().keys({      
      description : Joi.string(),
      title : Joi.string(),
      alias : Joi.string()
  }),

  serial_no: Joi.number(),
  alias: Joi.string(),  
  type: Joi.string(),

  is_child_question: Joi.boolean(),
  tabular : Joi.object().keys({
    child_ids : Joi.array().items(objectId),
    context : Joi.any(),
    question_id : objectId,
    question_version : Joi.number(),
    type: Joi.array().items(Joi.string())    
  }),

  organization_id: objectId,

  baseline_surveys : Joi.object().keys({    
    survey_id : objectId,
    version : Joi.number(),
    survey_version_id  : Joi.number()
  }),

  parent_section_question_id : objectId,
  conditionality: Joi.array().items(
    Joi.object().keys({
        order_no : Joi.number(),
        child_id : objectId,
        match: Joi.string(),
        query_type: Joi.string()
      }
  )),

  dependency : Joi.array().items(Joi.object().keys({
      order_no : Joi.number(),
      parent_id : objectId,
      connector : Joi.string()
    }
  )),

  appendix : Joi.object().keys({
    limit: Joi.object().keys({
      lower: Joi.number(),
      upper: Joi.number()
    }),
    consent : Joi.boolean(),
    autofill_previous_response: Joi.boolean(),
    options : Joi.array().items(
      Joi.object().keys({
        _id : Joi.number(),
        code : Joi.string(),
        code_i8ln : Joi.object(),
        label : Joi.string(),
        label_i8ln : Joi.object()
      })
    ),
    help_image_url : Joi.string()
    }
  ),


  option_ids: Joi.array().items(Joi.string()),
  type: Joi.string(),

  child_question: Joi.boolean(),
  context: Joi.any(),

  timestamp: Joi.date(),
  timestamp_ts: Joi.number(),
  linked_response_id: objectId,
  linked_response_version: Joi.number(),

  description : Joi.string(),
  title : Joi.string(),
  alias : Joi.string(),

  metadata_i8ln : Joi.object().pattern(/^\w+$/, Joi.object().keys({
      description : Joi.string(),
      title : Joi.string(),
      alias : Joi.string()
  })),

  state : Joi.array().items(Joi.string()),

  question_id : objectId,
  live : Joi.boolean(),
  version : Joi.number(),

  remote_ip: Joi.string(),
  browser_user_agent: Joi.string(),
  user_id: objectId,
  modified_time : Joi.date(),
  modified_time_ts: Joi.number(),
  client_id: Joi.string()
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