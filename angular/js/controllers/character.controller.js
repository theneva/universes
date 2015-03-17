angular.module('universes').controller('CharacterController', function ($scope, $routeParams, $http) {
    $http.get('/api/characters/' + $routeParams.id)
        .success(function (character) {
            $scope.character = character;
        });
});
