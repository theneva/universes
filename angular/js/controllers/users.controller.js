angular.module('universes').controller('UsersController', function($scope, $http) {
    $http.get('/api/users')
        .success(function(users) {
            $scope.users = users;
        });

    $scope.newUser = {};

    $scope.createUser = function() {
        $http.post('/api/users', $scope.newUser)
            .success(function(user) {
                $scope.users.unshift(user);
                $scope.username = $scope.password = '';
            });
    };

    $scope.removeUser = function(id) {
        $http.delete('/api/users/' + id)
            .success(function() {
                _.remove($scope.users, function(user) {
                    return user._id === id;
                });
            });
    };
});
