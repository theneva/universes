angular.module('universes').controller('CharacterController', function ($scope, $routeParams, $http, $location) {
    $http.get('/api/characters/' + $routeParams.id)
        .success(function (character) {
            $scope.character = character;
        });

    $scope.updateCharacter = function (character) {
        $http.put('/api/characters/' + character._id, character)
            .error(function (message) {
                console.log(message);
            });
    };
});
