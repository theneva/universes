angular.module('universes').controller('ApplicationController', function ($scope, $location, SessionsService) {
    $scope.$on('$locationChangeStart', function (event) {

        if ($scope.currentUser) {
            return;
        }

        //if ($location.)
        if ($location.path() === '/login') {
            return;
        }

        $location.path('/login');
    });

    $scope.$on('login', function (event, username) {
        console.log('login');
        console.log(event);
        console.log(username);
        $scope.currentUser = username;
    });

    $scope.logout = function () {
        SessionsService.logout();
        delete $scope.currentUser;
        $location.path('/login');
    };
});
