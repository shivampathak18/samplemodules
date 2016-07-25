// This is a file generated by the yeoman generator hapijs

/**
 * All the endpoints for anything related to user
 *
 * @type {exports}
 */
var Joi = require('joi');
var userController = require('./user-ctrl');
var routeValidation = require('./user-route-validation');

module.exports = function() {
  return [
    {
      method: 'POST',
      path: '/login',
      config: {
        tags: ['api'],
        description: 'Login a user',
        handler: function(req, reply){
          console.log(req.headers, req.payload, req.query);
          return reply("OK")
        },
        validate: {
        }
      }
    },

    {
      method: 'GET',
      path: '/notify',
      config: {
        tags: ['api'],        
        description: 'a',
        handler: function(req, reply){
          console.log(req.query)
          reply(req.query, req.payload, req.headers, req.body);
        }
      }
    },    

    {
      method: 'GET',
      path: '/users/oauth-redirect',
      config: {
        tags: ['api'],
        description: 'a',
        handler: function(req, reply){
          console.log(req.query)
          reply(req.query);
        }
      }
    },

    {
      method: 'POST',
      path: '/users',
      config: {
        tags: ['api'],
        payload: {
          parse: true
        },
        auth: false,
        description: 'Creates a user',
        handler: userController.create,
        validate: routeValidation.post
      }
    },
		
    {
      method: 'GET',
      path: '/users',
      config : {
        tags: ['api'],
        description: 'Fetches all users',
        handler: userController.find
      }
    },
		
    {
      method: 'GET',
      path: '/users/{id}',
      config : {
        tags: ['api'],
        description: 'Fetches a user by id',
        handler: userController.findById,
        validate: routeValidation.getById
      }
    },
		
    {
      method: 'PUT',
      path: '/users/{id}',
      config : {
        tags: ['api'],
        description: 'Updates a user for a specific id',
        handler: userController.update,
        validate: routeValidation.put
      }
    },
		
    {
      method: 'DELETE',
      path: '/users/{id}',
      config : {
        tags: ['api'],
        description: 'Remove a user for a specific id',
        handler: userController.remove,
        validate: routeValidation.delete
      }
    }
		
		/* Add new methods above */
  ]
}();
