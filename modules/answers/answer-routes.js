// This is a file generated by the yeoman generator hapijs

/**
 * All the endpoints for anything related to answer
 *
 * @type {exports}
 */
var Joi = require('joi');
var answerController = require('./answer-ctrl');
var routeValidation = require('./answer-route-validation');

module.exports = function() {
  return [
    {
      method: 'POST',
      path: '/answers',
      config: {
        description: 'Creates a answer',
        handler: answerController.create,
        tags: ['api'],
        // validate: routeValidation.post,
        plugins: {
            'hapi-swagger': {
                responseMessages: [
                    { code: 400, message: 'Bad Request' },
                    { code: 500, message: 'Internal Server Error'}
                ]
            }
        }
      }
    },
    {
      method: 'POST',
      path: '/answers/file',


      config: {
         payload: {
          output: 'stream',
          parse: true,
          allow: 'multipart/form-data'
        },
        description: 'Creates answers from file',
        handler: answerController.createFromFile,
        tags: ['api'],
        // validate: {},
        plugins: {
            'hapi-swagger': {
                responseMessages: [
                    { code: 400, message: 'Bad Request' },
                    { code: 500, message: 'Internal Server Error'}
                ]
            }
        }
      }      
    },
  		
    {
      method: 'GET',
      path: '/answers',
      config : {
        tags: ['api'],
        description: 'Fetches all answers',
        handler: answerController.find
      }
    },

    {
      method: 'GET',
      path: '/answers/findOne',
      config : {
        tags: ['api'],
        description: 'Fetches one answer',
        handler: answerController.findOne
      }
    },

    {
      method: 'GET',
      path: '/answers/count',
      config : {
        tags: ['api'],
        description: 'Returns number of answers based on any or no conditions',
        handler: answerController.count
      }
    },

    {
      method: 'GET',
      path: '/answers/distinct',
      config : {
        tags: ['api'],
        description: 'Finds distinct values of field for documents matching conditions',
        handler: answerController.distinct
      }
    },
		
    {
      method: 'GET',
      path: '/answers/{id}',
      config : {
        tags: ['api'],
        description: 'Fetches a answer by id',
        handler: answerController.findById,
        // validate: routeValidation.getById
      }
    },
		
    {
      method: 'PUT',
      path: '/answers/{id}',
      config : {
        tags: ['api'],
        description: 'Updates a answer for a specific id',
        handler: answerController.update,
        // validate: routeValidation.put
      }
    },
		
    {
      method: 'DELETE',
      path: '/answers/{id}',
      config : {
        tags: ['api'],
        description: 'Remove a answer for a specific id',
        handler: answerController.remove,
        // validate: routeValidation.delete
      }
    },
    {
      method: 'GET',
      path: '/testsendgrid',
      config : {
        tags: ['api'],
        description: 'Tests sendgrid emails',
        handler: answerController.testSendGrid
      }
    },
    {
      method: 'GET',
      path: '/testsms',
      config : {
        tags: ['api'],
        description: 'Tests sms service',
        handler: answerController.testSMS
      }
    },
    {
      method: 'POST',
      path: '/testsmsbulk',
      config : {
        tags: ['api'],
        description: 'Tests sms service to multiple users were verified.',
        handler: answerController.testSMSBulk
      }
    },
    {
      method: 'GET',
      path: '/testgcm',
      config : {
        tags: ['api'],
        description: 'Tests gcm',
        handler: function(req,reply){
          reply({'message':req.query.message})
        }
      }
    }
		
		/* Add new methods above */
  ]
}();