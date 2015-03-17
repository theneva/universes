angular.module('universes').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'templates/races.html'
        })
        .otherwise({
            controller: 'NotFoundController',
            templateUrl: 'templates/not_found.html'
        });
});
