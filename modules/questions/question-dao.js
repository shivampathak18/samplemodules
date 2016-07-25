// This is a file generated by the yeoman generator hapijs

/**
 * Dao layer which actually gets Question from the datastore
 *
 * @type {exports}
 */
var Boom = require('boom');
var mongoose = require('mongoose');
var Joi = require('joi');
var Schema = mongoose.Schema;

var questionSchema = mongoose.Schema({
	survey_id : Schema.Types.ObjectId,
	survey_version_id : Schema.Types.ObjectId,

	required : Boolean,

	metadata : {
		description : String,
		title : String,
		alias : String
	},

  serial_no: Number,
  alias: String,  
  type: String,

  is_child_question: Boolean,
  tabular : {
  	child_ids : [Schema.Types.ObjectId],
  	context : Schema.Types.Mixed,
  	question_id : Schema.Types.ObjectId,
  	question_version : Number,
  	type: [String]
  },


  organization_id: Schema.Types.ObjectId,

  baseline_surveys : {
	  survey_id : Schema.Types.ObjectId,
	  version : Number,
	  survey_version_id  : Number
  },

  parent_section_question_id : Schema.Types.ObjectId,
  conditionality: [{
		order_no : Number,
		child_id : Schema.Types.ObjectId,
		match: String,
		query_type: String
	}],

	dependency : [{
		order_no : Number,
		parent_id : Schema.Types.ObjectId,
		connector : String
	}],

	appendix : {
		limit: {
		lower: Number,
		upper: Number
	},
		consent : Boolean,
		autofill_previous_response: Boolean,
		options : [{
			_id : Number,
			code : String,
			code_i8ln : {},
			label : String,
			label_i8ln : {}
		}],
		help_image_url : String
	},


  option_ids: [String],
  
  child_question: Boolean,
  context: Schema.Types.Mixed,

  timestamp: Date,
  timestamp_ts: Number,
  linked_response_id: Schema.Types.ObjectId,
  linked_response_version: Number,

  description : String,
  title : String,
  alias : String,

  metadata_i8ln : {
  	en : {
		  description : String,
		  title : String,
		  alias : String
	  },
	  hi : {
		  description : String,
		  title : String,
		  alias : String
	  }
  },

  state : String,

  question_id : Schema.Types.ObjectId,
  live : Boolean,
  version : Number,

  remote_ip: String,
  browser_user_agent: String,
  user_id: Schema.Types.ObjectId,
  modified_time : Date,
  modified_time_ts: Number,
  client_id: String
});

var questionSchema = mongoose.Schema({}, {strict: false});

// Question Instance methods
questionSchema.methods.magic = function(callback){
  return this.model('Question').find({}, callback)
}


// Question Collection methods
questionSchema.statics.magic = function (callback) {
  return this.find({ name: new RegExp(name, 'i') }, callback);
}

// Question Collection methods
/*
questionSchema.statics.bulkUpload = function (payload,callback) {
console.log(this.model('Question'));
  return this.model('Question').collection.insert(payload, callback);
  //return this.find({ name: new RegExp(name, 'i') }, callback);
}
*/

// Question Indexes

// by organisation_id Question id and 
questionSchema.index({
  organisation_id: 1,
  survey_id: 1,
  question_id: 1,  
  survey_version_id: 1,
  version: 1  
});



var Question = mongoose.model('Question', questionSchema);

module.exports = Question