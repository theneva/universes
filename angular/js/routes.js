angular.module('universes').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'templates/races.html'
        })
        .when('/characters', {
            controller: 'CharactersController',
            templateUrl: 'templates/characters.html'
        })
        .otherwise({
            controller: 'NotFoundController',
            templateUrl: 'templates/not_found.html'
        });
});
