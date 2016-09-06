'use strict';

/**
 * @ngdoc function
 * @name autoscienceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the autoscienceApp
 */
app.controller('mainCtrl', function ($scope) {

  $scope.datasets = [
    { "id":1, "name":"titanic",	"desc":"Master of Life"},
    { "id":2, "name":"pokemon",	"desc":"Got to catch 'em all"},
    { "id":3, "name":"flight",	"desc":"Control Space and Time"},
    { "id":4, "name":"network",	"desc":"Champ of Light Cycles"}
  ]

});
