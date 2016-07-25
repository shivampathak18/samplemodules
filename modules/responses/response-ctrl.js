// This is a file generated by the yeoman generator hapijs

/**
 * Controller which handles requests/responses relating to response
 *
 * @type {responseDao|exports}
 */
var responseDao = require('./response-dao');
var Boom = require('boom');
var _ = require('underscore');
var mongoose = require('mongoose');

/**
 * Creates a response
 *
 * @param req
 * @param reply
 */
exports.create = function (req, reply) {

  var response = new responseDao(req.payload);
  response.save();

  return reply(response);

};

/**
 * Gets all responses
 *
 * @param req
 * @param reply
 */
exports.find = function (req, reply) {
  var query = req.query;
  /*var conditions = query['filter'] && query['filter'] || {};
  var projection = query['projection'] && query['projection'] || {};*/

  var conditions, projection,options;
  if(!_.isEmpty(query['filter']))  
    conditions = JSON.parse(query['filter']);
  else
    conditions = {};
  
 
  if(!_.isEmpty(query['projection']))  
    projection = JSON.parse(query['projection']);
  else
    projection = {};
  
  if(!_.isEmpty(query['options']))  
    options = JSON.parse(query['options']);
  else
    options = {};

  responseDao.find(conditions, projection, options, function(err, responses){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(responses);
  });

};

/**
 * Finds all responses and returns the first survey object
 *
 * @param req
 * @param reply
 */
exports.findOne = function (req, reply) {
  var query = req.query;
    
  var conditions, projection,options;
    if(!_.isEmpty(query['filter']))  
      conditions = JSON.parse(query['filter']);
    else
      conditions = {};  
   
    if(!_.isEmpty(query['projection']))  
      projection = JSON.parse(query['projection']);
    else
      projection = {};
    
    if(!_.isEmpty(query['options']))  
      options = JSON.parse(query['options']);
    else
      options = {};    

  responseDao.findOne(conditions, projection, options, function(err, response){
    // Check for embed fields
    
    if (err) {
      return reply(Boom.wrap(err));
    }
    else
      return reply(response);
    //return reply(surveys);
  });

};

/**
 * Get a specific response by id
 *
 * @param req
 * @param reply
 */
exports.findById = function (req, reply) {

  var _id = req.params['id'];

  responseDao.findById(_id, function (err, response) {
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(response);
  });
};

/**
 * Update a specific response by id
 *
 * @param req
 * @param reply
 */
exports.update = function (req, reply) {
  var payload = JSON.parse(req.payload);
  var _id = req.params['id']
  var update = payload['update'];
  var options = {'new': true};
  responseDao.findByIdAndUpdate(_id, update, options, function(err, response){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(response);
  })
};
    
/**
 * Remove a specific response by id
 *
 * @param req
 * @param reply
 */
exports.remove = function (req, reply) {

  responseDao.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(data);
  });
};

/**
 * Counts number of responses for given conditions or no condition
 * @param req
 * @param reply
 */
exports.count = function (req, reply) {
  var query = req.query;
  var conditions;
    if(!_.isEmpty(query['filter']))  
      conditions = JSON.parse(query['filter']);
    else
      conditions = {};

  responseDao.count(conditions, function(err, result){
    // Check for embed fields
    if (err) {
      return reply(Boom.wrap(err));
    }    
    else
      return reply(result);
    //return reply(surveys);
  });
};

/**
 * Finds distinct values of field for documents matching conditions.
 *
 * @param req
 * @param reply
 */
exports.distinct = function (req, reply) {
  var query = req.query;
    
  var conditions, field;
    if(!_.isEmpty(query['filter']))  
      conditions = JSON.parse(query['filter']);
    else
      conditions = {};  
   
    if(!_.isEmpty(query['field']))  
      field = query['field'];
    else
      field = '';      

  responseDao.distinct(field, conditions, function(err, responses){
    // Check for embed fields
    
    if (err) {
      return reply(Boom.wrap(err));
    }    
    else
      return reply(responses);
    //return reply(surveys);
  });

};

exports.getFlaggedResponseCountForUserPerSurvey = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(data);
  }

  return responseDao.aggregate([
    {
      $match: {
        flagged: true,
        user_id: mongoose.Types.ObjectId(req.query.user_id)
      }
    },
    {
      $groups: {
        _id: {
          survey_id: "$survey_id",
        },
        responseCount: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        survey_id: "$_id.survey_id",
        responseCount: 1,
        _id: 0
      }
    }

  ], callback)

}


exports.getResponseCountByUser = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply({
      responseCount: data
    });
  }

  return responseDao.count({
    user_id: mongoose.Types.ObjectId(req.query.user_id)
  }, callback)

}


exports.getResponseTypesByUserPerSurvey = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }

    var response = {}

    _.each(data, function(x){
      var survey_id = x['survey_id'];
      var type = x['type'];
      try{
        response[survey_id][type] = x['responseCount']
      }
      catch(e){
        if(e instanceof TypeError){
          response[survey_id] = {
            survey_id: survey_id
          }
          response[survey_id][type] = x['responseCount']          
        }
      }
    })

    response = _.values(response)
    return reply(response);
  }

  return responseDao.aggregate([
    {
      $match: {
        user_id: mongoose.Types.ObjectId(req.query.user_id)
      }
    },
    {
      $groups: {
        _id: {
          survey_id: "$survey_id",
          type: "$type"
        },
        responseCount: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        survey_id: "$_id.survey_id",
        type: "$_id.type",
        responseCount: 1,
        _id: 0
      }
    }

  ], callback)

}

exports.getResponseCountForUserPerDate = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    var response = _.map(data, function(x){
      var survey_id = x['survey_id'];
      var year = x['year'];
      var month = x['month'];
      var day = x['day'];
      return {
        survey_id: survey_id,
        date: new Date(year, month, day),
        responseCount: x['responseCount']
      }
    })
    return reply(response);
  }

  return responseDao.aggregate([
    {
      $match: {
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
        user_id: mongoose.Types.ObjectId(req.query.user_id)
      }
    },

    {
      $project: {
        user_id: 1,
        survey_id: 1,
        year: {
          $year: "$created_on"
        },
        month: {
          $month: "$created_on"
        },
        day: {
          $dayOfMonth: "$created_on"
        },
      }
    },

    {
      $group: {
        _id: {
          survey_id: "$survey_id",
          year: "$year",
          month: "$month",
          day: "$day"
        },
        responseCount: {
          $sum: 1
        }
      }
    },

    {
      $project: {
        survey_id: "$_id.survey_id",
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.day",
        responseCount: 1,
        _id: 0
      }
    }

  ], callback)

}

exports.getResponsesPerAppVersion = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(data);
  }

  return responseDao.aggregate([
    {
      $match: {
        organization_id: mongoose.Types.ObjectId(req.query.organization_id),
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
      }
    },
    {
      $groups: {
        _id: {
          survey_id: "$survey_id",
          version: "$version"
        },
        responseCount: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        survey_id: "$_id.survey_id",
        day: "$_id.version",
        responseCount: 1,
        _id: 0
      }
    }


  ], callback)

}


exports.getSurveyWiseResponseCountByDate = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    var response = _.map(data, function(x){
      var survey_id = x['survey_id'];
      var year = x['year'];
      var month = x['month'];
      var day = x['day'];
      return {
        survey_id: survey_id,
        date: new Date(year, month, day),
        responseCount: x['responseCount']
      }
    })
    return reply(response);
  }

  return responseDao.aggregate([
    {
      $match: {
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
        organization_id: mongoose.Types.ObjectId(req.query.organization_id)
      }
    },

    {
      $project: {
        created_on: 1,
        organization_id: 1,
        survey_id: 1,
        year: {
          $year: "$created_on"
        },
        month: {
          $month: "$created_on"
        },
        day: {
          $dayOfMonth: "$created_on"
        },
      }
    },

    {
      $group: {
        _id: {
          survey_id: "$survey_id",
          year: "$year",
          month: "$month",
          day: "$day"
        },
        responseCount: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        survey_id: "$_id.survey_id",
        year: "$_id.year",
        month: "$_id.month",
        day: "$_id.day",
        responseCount: 1,
        _id: 0
      }
    }

  ], callback)

}


exports.getAnswerCountForOrganization = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply({
      responseCount: data
    });
  }

  return responseDao.count({
    organization_id: mongoose.Types.ObjectId(req.query.organization_id)
  }, callback)

}


exports.getResponseCountForUserPerSurvey = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(data);
  }

  return responseDao.aggregate([
    {
      $match: {
        user_id: mongoose.Types.ObjectId(req.query.user_id),
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
      }
    },
    {
      $groups: {
        _id: {
          survey_id: "$survey_id",
        },
        responseCount: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        survey_id: "$_id.survey_id",
        responseCount: 1,
        _id: 0
      }
    }

  ], callback)

}


exports.getForcedvsRegularResponseCount = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(data);
  }

  return responseDao.aggregate([
    {
      $match: {
        organization_id: mongoose.Types.ObjectId(req.query.organization_id),
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
      }
    },
    {
      $groups: {
        _id: {
          state: "$state",
        },
        responseCount: {
          $sum: 1
        }
      }
    },
    {
      $project: {
        state: "$_id.state",
        responseCount: 1,
        _id: 0
      }
    }

  ], callback)

}


exports.getAverageTimeTakenPerSurvey = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    return reply(data);
  }

  return responseDao.aggregate([
    {
      $match: {
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
        organization_id: mongoose.Types.ObjectId(req.query.organization_id)
      }
    },

    {
      $project: {
        created_on: 1,
        survey_id: 1,
        time_taken: 1
      }
    },

    {
      $group: {
        _id: {
          survey_id: "$survey_id",
        },
        average_time_taken: {
          $avg: "$time_taken"
        }
      }
    },
    {
      $project: {
        survey_id: "$_id.survey_id",
        average_time_taken: 1,
        _id: 0
      }
    }

  ], callback)

}


exports.getAllResponseDetails = function(req, reply){

  reply("OK");

}

exports.getGeoLocPerResponse = function(req, reply){

  reply("OK");

}


exports.getAverageDailyResponseCount = function(req, reply){
  var callback = function(err, data){
    if (err) {
      return reply(Boom.wrap(err));
    }
    var response = _.map(data, function(x){
      var survey_id = x['survey_id'];
      var year = x['year'];
      var month = x['month'];
      var day = x['day'];
      return {
        survey_id: survey_id,
        date: new Date(year, month, day),
        responseCount: x['responseCount']
      }
    })
    return reply(response);
  }

  return responseDao.aggregate([
    {
      $match: {
        created_on: {
          $gte: req.query.from_date,
          $lt: req.query.to_date
        },
        organization_id: mongoose.Types.ObjectId(req.query.organization_id)
      }
    },

    {
      $project: {
        created_on: 1,
        year: {
          $year: "$created_on"
        },
        month: {
          $month: "$created_on"
        },
        day: {
          $dayOfMonth: "$created_on"
        },
      }
    },

    {
      $group: {
        _id: {
          year: "$year",
          month: "$month",
          day: "$day"
        },
        responseCount: {
          $sum: 1
        }
      }
    },

    {
      $group: {
        _id: "all",
        avg: {
          $avg: "$responseCount"
        }
      }
    },

    {
      $project: {
        avg: 1,
        _id: 0
      }
    }

  ], callback)

}
/* Add new methods above */