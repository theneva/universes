angular.module('universes').config(function ($routeProvider) {
    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'templates/login.html'
        })
        .when('/', {
            controller: 'MainController',
            templateUrl: 'templates/races.html'
        })
        .when('/users', {
            controller: 'UsersController',
            templateUrl: 'templates/users.html'
        })
        .when('/characters', {
            controller: 'CharactersController',
            templateUrl: 'templates/characters.html'
        })
        .when('/characters/:id/:name', {
            controller: 'CharacterController',
            templateUrl: 'templates/character.html'
        })
        .otherwise({
            controller: 'NotFoundController',
            templateUrl: 'templates/not_found.html'
        });
});
