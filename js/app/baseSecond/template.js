(function() {

    angular.module('app')
        .controller('baseSecond.test1Controller', ['$scope', HomeController]);

    function HomeController($scope) {
        var context = $scope;
        console.log('baseSecond.test1Controller');
    }
})();
(function() {

    angular.module('app')
        .controller('baseSecond.test2Controller', ['$scope', HomeController]);

    function HomeController($scope) {
        var context = $scope;
        console.log('baseSecond.test2Controller');
    }
})();