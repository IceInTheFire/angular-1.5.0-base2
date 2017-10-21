(function() {
    console.log("app.config");



    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider','$ocLazyLoadProvider', configRoute])
        // .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider' , configRoute])
        // .config(configRoute)
        .config(['$locationProvider', configSce])
        // .config(configSce)
        // .run(runCore)
        .run(['$rootScope','$state','$ocLazyLoad', runCore]);


    function configRoute($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider) {
        // console.log("like");
        $urlRouterProvider.otherwise('/hello/hello');
        // $urlRouterProvider.otherwise('/book');

        $ocLazyLoadProvider.config({
            // Set to true if you want to see what and when is dynamically loaded
            debug: false
        });

        var isProd = 0; //是否是发布版本
        var apps = ["hello","welcome","baseFirst","baseSecond"];

        var dictionary = [];
        var jsJson;
        var cssJson;
        if (isProd) {

            jsJson = {};
            cssJson = {};
            var jsStr = '/template.min.js';
            var cssStr = '/template.min.css';

            jsJson['hello' + jsStr] = 'hello/template.min.js';
            cssJson['hello' + cssStr] = 'hello/template.min.css';

            jsJson['welcome' + jsStr] = 'welcome/template.min.js';
            cssJson['welcome' + cssStr] = 'welcome/template.min.css';

            jsJson['baseFirst' + jsStr] = 'baseFirst/template.min.js';
            cssJson['baseFirst' + cssStr] = 'baseFirst/template.min.css';

            jsJson['baseSecond' + jsStr] = 'baseSecond/template.min.js';
            cssJson['baseSecond' + cssStr] = 'baseSecond/template.css';

            console.log(jsJson);
            console.log(cssJson);
            getUrl();
        }
        else {
            angular.forEach(apps, function (data, index, array) {
                var item = {};
                item.name = data;
                item.serie = true;
                item.files = [];
                var cssString = data + '/template.css';
                item.files.push('./css/app/' + cssString);
                var jsString = data + '/template.js';
                item.files.push(('./js/app/' + jsString));
                dictionary.push(item);
            });
            $ocLazyLoadProvider.config({
                modules: dictionary
            });
            init();
        }

        function getUrl() {
            if (!(jsJson && cssJson)) {
                return;
            }
            angular.forEach(apps, function (data, index, array) {

                var item = {};
                item.name = data;
                item.serie = true;
                item.files = [];
                var cssString = data + '/template.min.css';
                // item.files.push('./css/module/' + cssJson[cssString]);
                item.files.push('./css/app/' + cssJson[cssString]);
                var jsString = data + '/template.min.js';
                // item.files.push(('./js/module/' + jsJson[jsString]));
                item.files.push(('./js/app/' + jsJson[jsString]));
                dictionary.push(item);
            });
            $ocLazyLoadProvider.config({
                modules: dictionary
            });
            console.log("1111");
            console.log(dictionary);
            init();
        }


        function init() {
            $stateProvider
                .state('book', {
                    url: '/book',
                    templateUrl: 'WEB/app/book/book.html',
                    controller:'bookController',
                    // templateUrl: 'WEB/bar/nav2.html',
                })
                .state('hello', {
                    url: '/hello',
                    templateUrl: 'WEB/bar/nav.html',
                    // templateUrl: 'WEB/bar/nav2.html',
                    resolve: {
                        store: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('hello')
                        }]
                    }
                })
                .state('hello.hello', {
                    url: '/hello',
                    templateUrl: 'WEB/app/hello/hello.html',
                    controller: 'hello.helloController'
                })
                .state('welcome', {
                    url: '/welcome',
                    templateUrl: 'WEB/bar/nav.html',
                    // templateUrl: 'WEB/bar/nav2.html',
                    resolve: {
                        store: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('welcome')
                        }]
                    }
                })
                .state('welcome.welcome', {
                    url: '/welcome',
                    templateUrl: 'WEB/app/welcome/welcome.html',
                    controller: 'welcome.welcomeController'
                })
                .state('baseFirst', {
                    url: '/baseFirst',
                    templateUrl: 'WEB/bar/nav.html',
                    // templateUrl: 'WEB/bar/nav2.html',
                    resolve: {
                        store: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('baseFirst')
                        }]
                    }
                })
                .state('baseFirst.test1', {
                    url: '/test1',
                    templateUrl: 'WEB/app/baseFirst/test1.html',
                    controller: 'baseFirst.test1Controller'
                })
                .state('baseFirst.test2', {
                    url: '/test2',
                    templateUrl: 'WEB/app/baseFirst/test2.html',
                    controller: 'baseFirst.test2Controller'
                })
                .state('baseSecond', {
                    url: '/baseSecond',
                    templateUrl: 'WEB/bar/nav.html',
                    // templateUrl: 'WEB/bar/nav2.html',
                    resolve: {
                        store: ['$ocLazyLoad', function($ocLazyLoad) {
                            return $ocLazyLoad.load('baseSecond')
                        }]
                    }
                })
                .state('baseSecond.test1', {
                    url: '/test1',
                    templateUrl: 'WEB/app/baseSecond/test1.html',
                    controller: 'baseSecond.test1Controller'
                })
                .state('baseSecond.test2', {
                    url: '/test2',
                    templateUrl: 'WEB/app/baseSecond/test2.html',
                    controller: 'baseSecond.test2Controller'
                })
        }


    }

    function configSce($locationProvider) {
        //$locationProvider.html5Mode(true);
    }

    function runCore($rootScope, $state, $ocLazyLoad, Core) {
        $rootScope.$state = $state;
    }
})();