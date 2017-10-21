(function () {
    angular
        .module('app')
        // .controller('hello.helloController', ['$scope', 'Core', HomeController]);
        .controller('bookController', ['$scope', HomeController]);

    function HomeController($scope, Core) {
        // console.log( window.$ );
        // var context = $scope;
        // context.onClickData = function(data){
        //
        // }
        // context.idItems = {
        //     photoFg:"http://img.duoshoubang.com/55fbccd83686133685b5d81533fff3d2.jpg"
        // }
        console.log("book");
        console.log("hello");
    }
})();