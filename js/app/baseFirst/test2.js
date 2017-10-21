(function() {

    angular.module('app')
        .controller('baseFirst.test2Controller', ['$scope', HomeController]);

    function HomeController($scope) {
        var context = $scope;
        console.log('baseFirst.test2Controller');
    }
})();