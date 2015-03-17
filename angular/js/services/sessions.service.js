angular.module('universes').service('SessionsService', function ($http) {
    this.login = function (username, password) {
        var payload = {
            username: username,
            password: password
        };

        return $http.post('/api/sessions', payload)
            .success(function (token) {
                $http.defaults.headers.common.Authorization = token;
            });
    };

    this.logout = function() {
        delete $http.defaults.headers.common.Authorization;
    }
});
