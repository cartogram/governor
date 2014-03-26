'use strict';

angular.module('governorApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'partials/login',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'partials/signup',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/reviews', {
        templateUrl: 'partials/reviews',
        controller: 'ReviewsCtrl'
      })
      .when('/reviews/create', {
        templateUrl: 'partials/reviews/create',
        controller: 'ReviewsCtrl',
        authenticate: true
      })
      .when('/reviews/:reviewId/edit', {
        templateUrl: 'partials/reviews/edit',
        controller: 'ReviewsCtrl',
        authenticate: true
      })
      .when('/reviews/list', {
        templateUrl: 'partials/reviews/list',
        controller: 'ReviewsCtrl'
      })
      .when('/reviews/:reviewId', {
        templateUrl: 'partials/reviews/view',
        controller: 'ReviewsCtrl'
      })
      .when('/creatives', {
        templateUrl: 'partials/creatives',
        controller: 'CreativesCtrl'
      })
      .when('/creatives/add', {
        templateUrl: 'partials/creatives/add',
        controller: 'CreativesCtrl',
        authenticate: true
      })
      .when('/creatives/:creativeId', {
        templateUrl: 'partials/creatives/view',
        controller: 'CreativesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
      
    $locationProvider.html5Mode(true);
      
    // Intercept 401s and redirect you to login
    $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    }]);
  })
  .run(function ($rootScope, $location, Auth) {

    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      
      if (next.authenticate && !Auth.isLoggedIn()) {
        $location.path('/login');
      }
    });
  });