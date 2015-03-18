angular.module('universes').controller('CharactersController', function ($scope, $http) {
    $http.get('/api/characters')
        .success(function (characters) {
            $scope.characters = characters;
        });

    $scope.newCharacter = {};

    $scope.createCharacter = function () {
        $http.post('/api/characters', $scope.newCharacter)
            .success(function (character) {
                $scope.newCharacter = {};
                $scope.characters.unshift(character);
            })
            .error(function (message) {
                console.log(message);
            });
    };

    $scope.removeCharacter = function (id) {
        $http.delete('/api/characters/' + id)
            .success(function () {
                _.remove($scope.characters, function (character) {
                    return character._id === id;
                });
            });
    };
});
