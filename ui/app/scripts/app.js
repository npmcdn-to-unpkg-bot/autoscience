'use strict';

/**
 * @ngdoc overview
 * @name autoscienceApp
 * @description
 * # autoscienceApp
 *
 * Main module of the application.
 */

'use strict';

// Declare app level module which depends on filters, and services
var app= angular.module('autoscienceApp', [
  'ngRoute'
]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'aboutCtrl',
        controllerAs: 'about'
      })
      .when('/ds/:id/overview', {
        templateUrl: 'views/ds/overview.html',
        controller: 'datasetCtrl',
        controllerAs: 'dataset'
      })
      .when('/ds/:id/variables/:vid', {
        templateUrl: 'views/ds/variables/3.html',
        controller: 'variablesCtrl',
        controllerAs: 'variables'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

app.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.xsrfCookieName = 'csrf';
  $httpProvider.defaults.xsrfHeaderName = 'X-csrf-token';
}]);

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push([
    '$injector',
    function ($injector) {
      return $injector.get('AuthInterceptor');
    }
  ]);
})

app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
          $rootScope.$broadcast({
            401: AUTH_EVENTS.notAuthenticated,
            403: AUTH_EVENTS.notAuthorized,
            419: AUTH_EVENTS.sessionTimeout,
            440: AUTH_EVENTS.sessionTimeout
          }[response.status], response);
          return $q.reject(response);
        }
    };
})
