(function() {
    var app = angular.module('app',[
        'ui.router',
        'oc.lazyLoad',
        // 'app.core',

    ]);

    app.controller('mainController', ['$scope', '$rootScope', '$state', mainController]);

    function mainController($scope, $rootScope, $state) {
        // $scope.$state = Core.$state;
        var context = $scope;
        context.onClickExit = onClickExit;

        context.userData = {
            userName:'冰中焱',
        }

        $scope.$state = $state;
        var context = $scope;
        // console.log($state);



        function onClickExit() {
            console.log('退出登录');
            // Core.Api.normalApi.Logout.logout().then(function(){
            //     location.href="/admin.html";
            // });
        }

        // Core.Api.normalApi.Auth.getAdminUser().then(function(response) {
        //     context.userData = response.data;
        // },function(error){
        //
        // })
    }

})();


