angular.module('universes').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'templates/not_found.html'
        })
        .otherwise({
            controller: 'NotFoundController',
            templateUrl: 'templates/not_found.html'
        });
});
