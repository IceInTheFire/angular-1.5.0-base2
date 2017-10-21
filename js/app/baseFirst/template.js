(function() {

    angular.module('app')
        .controller('baseFirst.test1Controller', ['$scope', HomeController]);

    function HomeController($scope) {
        var context = $scope;
        console.log('baseFirst.test1Controller');
    }
})();
(function() {

    angular.module('app')
        .controller('baseFirst.test2Controller', ['$scope', HomeController]);

    function HomeController($scope) {
        var context = $scope;
        console.log('baseFirst.test2Controller');
    }
})();