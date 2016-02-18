'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	_ = require('lodash');

const crypto = require('crypto');

var db = require('../../db');
var Story = require('../stories/story.model');


var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	photo: {
		type: String,
		default: '/images/default-photo.jpg'
	},
	phone: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	salt: String,
	google: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	twitter: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	github: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

User.methods.comparePassword = function(candidatePassword) {
	var key = new Buffer(crypto.pbkdf2Sync(candidatePassword, this.salt, 100, 512, 'sha512')).toString('base64');
  if (key === this.password) return true;
  else return false;
}

User.pre('save', function(next) {
	var salt = new Buffer(crypto.randomBytes(512)).toString('hex');
	var key = new Buffer(crypto.pbkdf2Sync(this.password, salt, 100, 512, 'sha512')).toString('base64');
	this.salt = salt;
	this.password = key;
	next();
});

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

module.exports = db.model('User', User);

