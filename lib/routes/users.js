'use strict';

var users = require('../controllers/users'),
  session = require('../controllers/session'); 

/**
 * Application routes
 */
 module.exports = function(app, passport) {


  // Server User Routes
  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);
 

};