'use strict';

/**
 * @ngdoc function
 * @name autoscienceApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the autoscienceApp
 */
app.controller('variableCtrl', function ($scope, $routeParams, $http) {
  var id= $routeParams.id;
  var vid= $routeParams.vid;
  $http({
    method: 'GET',
    url: '/cog/datasets/'+id+'/variables/'+vid
  }).then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available
    $scope.d = response.data
    console.log(response.data)
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });

});
