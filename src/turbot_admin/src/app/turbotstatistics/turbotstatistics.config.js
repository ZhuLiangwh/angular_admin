define([], function() {
    return function config(mod) {
        mod.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('turbotstatistics', {
                        abstract: true,
                        url: '/turbotstatistics',
                        template: '<ui-view/>'
                    })
                    .state('turbotstatistics.adpostat', {
                        url: '/adpostat',
                        templateUrl: 'app/turbotstatistics/adpostat.html',
                        controller: 'AdpostatListCtrl'
                    })
                    .state('turbotstatistics.adsrcstat', {
                        url: '/adsrcstat',
                        templateUrl: 'app/turbotstatistics/adsrcstat.html',
                        controller: 'AdsrcstatListCtrl'
                    })
                    /*insertstate*/
            }
        ]);
        return mod;
    };
});
