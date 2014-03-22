'use strict';

module.exports = {
	env: 'development',
	mongo: {
		uri: 'mongodb://localhost/fullstack-dev'
	},
	facebook: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/facebook/callback'
	},
	twitter: {
		clientID: 'CONSUMER_KEY',
		clientSecret: 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	github: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	},
	google: {
		clientID: 'APP_ID',
		clientSecret: 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: '7753mwwfc389od',
		clientSecret: 'jbQ8EZJ7XAGm8ObW',
		callbackURL: 'http://localhost:9000//auth/linkedin/callback'
	}
};