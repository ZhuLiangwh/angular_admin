define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('turbotservice', {
            abstract: true,
            url: '/turbotservice',
            template: '<ui-view/>'
          })
          .state('turbotservice.ad', {
            url: '/ad',
            templateUrl: 'app/turbotservice/ad.list.html',
            data: {
              model: 'ad',
              action: ['list']
            },
            controller: 'AdListCtrl'
          })
          .state('turbotservice.add-ad', {
            url: '/ad/add',
            templateUrl: 'app/turbotservice/ad.edit.html',
            data: {
              model: 'ad',
              action: ['add']
            },
            controller: 'AdEditCtrl'
          })
          .state('turbotservice.edit-ad', {
            url: '/ad/:id',
            templateUrl: 'app/turbotservice/ad.edit.html',
            data: {
              model: 'ad',
              action: ['edit']
            },
            controller: 'AdEditCtrl'
          })
          .state('turbotservice.adpos', {
            url: '/adpos',
            templateUrl: 'app/turbotservice/adpos.list.html',
            data: {
              model: 'adpos',
              action: ['list']
            },
            controller: 'AdposListCtrl'
          })
          .state('turbotservice.add-adpos', {
            url: '/adpos/add',
            templateUrl: 'app/turbotservice/adpos.edit.html',
            data: {
              model: 'adpos',
              action: ['add']
            },
            controller: 'AdposEditCtrl'
          })
          .state('turbotservice.edit-adpos', {
            url: '/adpos/:id',
            templateUrl: 'app/turbotservice/adpos.edit.html',
            data: {
              model: 'adpos',
              action: ['edit']
            },
            controller: 'AdposEditCtrl'
          })
          .state('turbotservice.adsource', {
            url: '/adsource',
            templateUrl: 'app/turbotservice/adsource.list.html',
            data: {
              model: 'adsource',
              action: ['list']
            },
            controller: 'AdsourceListCtrl'
          })
          .state('turbotservice.add-adsource', {
            url: '/adsource/add',
            templateUrl: 'app/turbotservice/adsource.edit.html',
            data: {
              model: 'adsource',
              action: ['add']
            },
            controller: 'AdsourceEditCtrl'
          })
          .state('turbotservice.edit-adsource', {
            url: '/adsource/:id',
            templateUrl: 'app/turbotservice/adsource.edit.html',
            data: {
              model: 'adsource',
              action: ['edit']
            },
            controller: 'AdsourceEditCtrl'
          })
          .state('turbotservice.adpush', {
            url: '/adpush',
            templateUrl: 'app/turbotservice/adpush.list.html',
            data: {
              model: 'adpush',
              action: ['list']
            },
            controller: 'AdpushListCtrl'
          })
          .state('turbotservice.add-adpush', {
            url: '/adpush/add',
            templateUrl: 'app/turbotservice/adpush.edit.html',
            data: {
              model: 'adpush',
              action: ['add']
            },
            controller: 'AdpushEditCtrl'
          })
          .state('turbotservice.edit-adpush', {
            url: '/adpush/:id',
            templateUrl: 'app/turbotservice/adpush.edit.html',
            data: {
              model: 'adpush',
              action: ['edit']
            },
            controller: 'AdpushEditCtrl'
          })
          .state('turbotservice.adgroup', {
            url: '/adgroup',
            templateUrl: 'app/turbotservice/adgroup.list.html',
            data: {
              model: 'adgroup',
              action: ['list']
            },
            controller: 'AdgroupListCtrl'
          })
          .state('turbotservice.add-adgroup', {
            url: '/adgroup/add',
            templateUrl: 'app/turbotservice/adgroup.edit.html',
            data: {
              model: 'adgroup',
              action: ['add']
            },
            controller: 'AdgroupEditCtrl'
          })
          .state('turbotservice.edit-adgroup', {
            url: '/adgroup/:id',
            templateUrl: 'app/turbotservice/adgroup.edit.html',
            data: {
              model: 'adgroup',
              action: ['edit']
            },
            controller: 'AdgroupEditCtrl'
          })
          .state('turbotservice.adstatistics', {
            url: '/adstatistics/:id',
            templateUrl: 'app/turbotservice/adstatistics.html',
            controller: 'AdstatisticsCtrl'
          })

      }
    ]);
    return mod;
  };
});
