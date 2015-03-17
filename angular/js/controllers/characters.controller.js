angular.module('universes').controller('CharactersController', function ($scope, $http) {
    $http.get('/api/characters')
        .success(function (characters) {
            $scope.characters = characters;
        });

    $scope.createCharacter = function (name, race) {
        var newCharacter = {
            name: name,
            race: race
        };

        $http.post('/api/characters', newCharacter)
            .success(function (character) {
                $scope.name = $scope.race = '';
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