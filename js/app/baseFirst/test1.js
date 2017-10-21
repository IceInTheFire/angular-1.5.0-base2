(function() {

    angular.module('app')
        .controller('baseFirst.test1Controller', ['$scope', HomeController]);

    function HomeController($scope) {
        var context = $scope;
        console.log('baseFirst.test1Controller');
    }
})();