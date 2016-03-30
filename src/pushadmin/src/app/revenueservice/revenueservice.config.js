define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('revenueservice', {
            abstract: true,
            url: '/revenueservice',
            template: '<ui-view/>'
          })
          .state('revenueservice.addondownloadurl', {
            url: '/addondownloadurl',
            templateUrl: 'app/revenueservice/addondownloadurl.list.html',
            data: {
              model: 'addondownloadurl',
              action: ['list']
            },
            controller: 'AddondownloadurlListCtrl'
          })
          .state('revenueservice.add-addondownloadurl', {
            url: '/addondownloadurl/add',
            templateUrl: 'app/revenueservice/addondownloadurl.edit.html',
            data: {
              model: 'addondownloadurl',
              action: ['add']
            },
            controller: 'AddondownloadurlEditCtrl'
          })
          .state('revenueservice.edit-addondownloadurl', {
            url: '/addondownloadurl/:id',
            templateUrl: 'app/revenueservice/addondownloadurl.edit.html',
            data: {
              model: 'addondownloadurl',
              action: ['edit']
            },
            controller: 'AddondownloadurlEditCtrl'
          })
          .state('revenueservice.rateusoptimization', {
            url: '/rateusoptimization',
            templateUrl: 'app/revenueservice/rateusoptimization.list.html',
            data: {
              model: 'rateusoptimization',
              action: ['list']
            },
            controller: 'RateusoptimizationListCtrl'
          })
          .state('revenueservice.add-rateusoptimization', {
            url: '/rateusoptimization/add',
            templateUrl: 'app/revenueservice/rateusoptimization.edit.html',
            data: {
              model: 'rateusoptimization',
              action: ['add']
            },
            controller: 'RateusoptimizationEditCtrl'
          })
          .state('revenueservice.edit-rateusoptimization', {
            url: '/rateusoptimization/:id',
            templateUrl: 'app/revenueservice/rateusoptimization.edit.html',
            data: {
              model: 'rateusoptimization',
              action: ['edit']
            },
            controller: 'RateusoptimizationEditCtrl'
          })
          .state('revenueservice.addonvideoinfo', {
            url: '/addonvideoinfo',
            templateUrl: 'app/revenueservice/addonvideoinfo.list.html',
            data: {
              model: 'addonvideoinfo',
              action: ['list']
            },
            controller: 'AddonvideoinfoListCtrl'
          })
          .state('revenueservice.add-addonvideoinfo', {
            url: '/addonvideoinfo/add',
            templateUrl: 'app/revenueservice/addonvideoinfo.edit.html',
            data: {
              model: 'addonvideoinfo',
              action: ['add']
            },
            controller: 'AddonvideoinfoEditCtrl'
          })
          .state('revenueservice.edit-addonvideoinfo', {
            url: '/addonvideoinfo/:id',
            templateUrl: 'app/revenueservice/addonvideoinfo.edit.html',
            data: {
              model: 'addonvideoinfo',
              action: ['edit']
            },
            controller: 'AddonvideoinfoEditCtrl'
          })

          .state('revenueservice.dolphinwidgeturl', {
            url: '/dolphinwidgeturl',
            templateUrl: 'app/revenueservice/dolphinwidgeturl.list.html',
            data: {
              model: 'dolphinwidgeturl',
              action: ['list']
            },
            controller: 'DolphinwidgeturlListCtrl'
          })
          .state('revenueservice.add-dolphinwidgeturl', {
            url: '/dolphinwidgeturl/add',
            templateUrl: 'app/revenueservice/dolphinwidgeturl.edit.html',
            data: {
              model: 'dolphinwidgeturl',
              action: ['add']
            },
            controller: 'DolphinwidgeturlEditCtrl'
          })
          .state('revenueservice.edit-dolphinwidgeturl', {
            url: '/dolphinwidgeturl/:id',
            templateUrl: 'app/revenueservice/dolphinwidgeturl.edit.html',
            data: {
              model: 'dolphinwidgeturl',
              action: ['edit']
            },
            controller: 'DolphinwidgeturlEditCtrl'
          })

          .state('revenueservice.intervalfunc', {
            url: '/intervalfunc',
            templateUrl: 'app/revenueservice/intervalfunc.list.html',
            data: {
              model: 'intervalfunc',
              action: ['list']
            },
            controller: 'IntervalfuncListCtrl'
          })
          .state('revenueservice.add-intervalfunc', {
            url: '/intervalfunc/add',
            templateUrl: 'app/revenueservice/intervalfunc.edit.html',
            data: {
              model: 'intervalfunc',
              action: ['add']
            },
            controller: 'IntervalfuncEditCtrl'
          })
          .state('revenueservice.edit-intervalfunc', {
            url: '/intervalfunc/:id',
            templateUrl: 'app/revenueservice/intervalfunc.edit.html',
            data: {
              model: 'intervalfunc',
              action: ['edit']
            },
            controller: 'IntervalfuncEditCtrl'
          })

        /*add state to here*/
      }
    ]);
    return mod;
  };
});
