'use strict';

angular.module('governorApp')
.factory('Creatives', function ($resource) {
    // Public API here
    return $resource('/api/creatives/:creativeId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  });
