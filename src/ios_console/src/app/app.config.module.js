define(function () {
    var modName = 'app.config';

    toastr.options.timeOut = 3000; //toaster的全局配置
    toastr.options.positionClass = 'toast-bottom-right';

    angular.module(modName, [])
        .constant('DEFAULT_STATE', 'thememarket.themepush')
        .constant('API', {
            'development': {
                domain: 'http://172.16.7.101:8080',
                basePath: '/ios_console'
            },
            'beta': {
                domain: 'http://172.16.7.14:8081',
                basePath: '/ios_console'
            },
            'release': {
                domain: 'http://customservice.dolphin.com:8080',
                basePath: '/ios_console'
            }
        })
        .value('ENV', 'development')
        .constant('PER_PAGE', 20);


    angular.module(modName)
        .config(['$logProvider', //logger setting
            function ($logProvider) {
                // turn debugging off/on (no info or warn)
                if ($logProvider.debugEnabled) {
                    $logProvider.debugEnabled(true);
                }
            }
        ])
        .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.defaults.withCredentials = true;
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
            }
        ])
        .config(['$modalProvider', function ($modalProvider) { //default config for ngbootstrap
            $modalProvider.options.backdrop = 'static';
            $modalProvider.options.keyboard = false;
        }])
        .config(['$urlRouterProvider', function ($urlRouterProvider) {
            // for any unmatched url, redirect to default state
            $urlRouterProvider.otherwise('thememarket.theme');
        }]);


    angular.module(modName)
        .run(['$rootScope', 'DEFAULT_STATE', '$log', '$state', handleRoutingErrors])
        .run(['$rootScope', updateDocTitle])
        .run(['$rootScope','$location','$timeout','dpSession',function($rootScope,$location,$timeout,dpSession){
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                var storage = window.sessionStorage;
                if ($location.search().popup){
                    angular.element('body').addClass('popup');
                    return;
                }
                $timeout(function(){
                    //缓存当前页面地址，用来在刷新页面时找回页面
                    var temp = dpSession.get('project');
                    temp['cacheUrl'] = $location.absUrl();
                    dpSession.set('project',temp);

                    //storage['url'] =$location.absUrl();
                },1000);

            });
        }]);


    var handlingRouteChangeError = false;

    function handleRoutingErrors($rootScope, DEFAULT_STATE, $log, $state) {
        // Route cancellation:
        // On routing error, go to the dashboard.
        // Provide an exit clause if it tries to do it twice.
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (handlingRouteChangeError) {
                return;
            }
            handlingRouteChangeError = true;
            var destination = toState.to || 'unknown target';
            var msg = 'Error routing to ' + destination + '. ' + (error || '');
            $log.debug(msg);
            $state.go(DEFAULT_STATE);
        });
    }

    function updateDocTitle($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            handlingRouteChangeError = false;
            var title = (toState.title || '');
            $rootScope.title = title; // data bind to <title>
        });
    }

    return modName;
});
