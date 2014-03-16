'use strict';

angular.module('governorApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
