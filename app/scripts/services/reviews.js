'use strict';

angular.module('governorApp')
.factory('Reviews', function ($resource) {
    // Public API here
    return $resource('/api/reviews/:reviewId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
