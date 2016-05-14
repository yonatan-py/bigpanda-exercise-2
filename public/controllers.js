var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', function ($scope, $http) {
  $http.get('/comments').then(function (response) {
    $scope._comments = response.data;
  });
  $scope.sendComment = function () {
    var payload =  {
      email: $scope.email,
      message: $scope.message
    };
    $scope.email = '';
    $scope.message = '';
    $http.post('/comment', payload);
    $scope._comments.push(payload);
  };
  $scope.comments = function () {
    return $scope._comments ? $scope._comments.filter(function (comment) {
      return !$scope.search || comment.message.indexOf($scope.search) >= 0;
    }): [];
  };
  $scope.hash = function (email) {
    return md5(email);
  }
});
