'use strict';

/**
 * Custom middleware used by the application
 */
module.exports = {
  /**
   * Generic require login routing middleware
   */
  requiresLogin : function(req, res, next) {
      if (!req.isAuthenticated()) {
          return res.send(401, 'User is not authorized');
      }
      next();
  },
  /**
   *  Protect routes on your api from unauthenticated access
   */
  auth: function auth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send(401);
  },

  /**
   * Set a cookie for angular so it knows we have an http session
   */
  setUserCookie: function(req, res, next) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.userInfo));
    }
    next();
  }
};