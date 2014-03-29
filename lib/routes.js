'use strict';

var api = require('./controllers/api'),
index = require('./controllers'),
reviews = require('./controllers/reviews'),
creatives = require('./controllers/creatives'),
users = require('./controllers/users'),
session = require('./controllers/session'),
aws = require('./controllers/aws');

var middleware = require('./middleware');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
  if (req.review.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

/**
 * Application routes
 */
 module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  app.get('/api/s3Policy', aws.getS3Policy);

  // Server Review Routes
  app.get('/api/reviews', reviews.all);
  app.post('/api/reviews', middleware.requiresLogin, reviews.create);
  app.get('/api/reviews/:reviewId', reviews.show);
  app.put('/api/reviews/:reviewId', middleware.requiresLogin, hasAuthorization, reviews.update);
  app.del('/api/reviews/:reviewId', middleware.requiresLogin, hasAuthorization, reviews.destroy);

  // // Finish with setting up the reviewId param
  app.param('reviewId', reviews.review);

   // Server Review Routes
   app.get('/api/creatives', creatives.all);
   app.post('/api/creatives', middleware.requiresLogin, creatives.create);

  
   app.get('/api/creatives/:creativeId', creatives.show);
   app.put('/api/creatives/:creativeId', middleware.requiresLogin, hasAuthorization, creatives.update);
   app.del('/api/creatives/:creativeId', middleware.requiresLogin, hasAuthorization, creatives.destroy);
   
  
  // // Finish with setting up the creativeId param
  app.param('creativeId', creatives.creative);

  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);

  app.get('/*', middleware.setUserCookie, index.index);


};