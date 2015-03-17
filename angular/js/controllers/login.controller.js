angular.module('universes').controller('LoginController', function($scope, $http, $location, SessionsService) {
    $scope.login = function(username, password) {
        SessionsService.login(username, password)
            .then(function() {
                $scope.$emit('login', username);
                $location.path('/');
            });
    };
});
