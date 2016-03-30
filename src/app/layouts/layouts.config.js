define([], function() {
    return function config(mod) {
        mod.config(['$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('changepassword', {
                        url: '/changepassword',
                        templateUrl: 'app/layouts/changepassword.html',
                        data: {
                            model: 'user'
                        },
                        controller: 'UserSettingCtrl'
                    })
            }
        ]);
        return mod;
    };
});