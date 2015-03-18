angular.module('universes').controller('MainController', function ($scope, $http) {
    $http.get('/api/races')
        .success(function (races) {
            $scope.races = races;
        });

    $scope.newRace = {};

    $scope.createRace = function () {
        $http.post('/api/races', $scope.newRace)
            .success(function (race) {
                $scope.raceType = $scope.earType = '';
                $scope.races.unshift(race);
            })
            .error(function (message) {
                console.log(message);
            });
    };

    $scope.removeRace = function (id) {
        $http.delete('/api/races/' + id)
            .success(function () {
                _.remove($scope.races, function (race) {
                    return race._id === id;
                });
            })
            .error(function(message) {
                console.log(message);
            });
    };
});
