// create the controller and inject Angular's $scope
gameApp.controller('dashboardController', function ($scope, $location) {

    $scope.gotoPage = function (location) {
        $location.path('/'+location);
    }
});