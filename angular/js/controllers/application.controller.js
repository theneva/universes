angular.module('universes').controller('ApplicationController', function ($scope, $location, SessionsService) {
    $scope.$on('$locationChangeStart', function () {
        if ($scope.currentUser) {
            return;
        }

        if ($location.path() === '/login') {
            return;
        }

        $location.path('/login');
    });

    $scope.$on('login', function (event, username) {
        $scope.currentUser = username;
    });

    $scope.logout = function () {
        SessionsService.logout();
        delete $scope.currentUser;
        $location.path('/login');
    };
});
