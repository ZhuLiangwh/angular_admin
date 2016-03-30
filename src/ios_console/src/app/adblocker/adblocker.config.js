define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('adblocker', {
            abstract: true,
            url: '/adblocker',
            template: '<ui-view/>'
          })
          //adblockerfile start
          .state('adblocker.adblockerfile', {
            url: '/adblockerfile',
            templateUrl: 'app/adblocker/adblockerfile.list.html',
            data: {
              model: 'adblockerfile',
              action: ['list']
            },
            controller: 'AdblockerfileListCtrl'
          })
          .state('adblocker.add-adblockerfile', {
            url: '/adblockerfile/add',
            templateUrl: 'app/adblocker/adblockerfile.edit.html',
            data: {
              model: 'adblockerfile',
              action: ['add']
            },
            controller: 'AdblockerfileEditCtrl'
          })
          .state('adblocker.edit-adblockerfile', {
            url: '/adblockerfile/:id',
            templateUrl: 'app/adblocker/adblockerfile.edit.html',
            data: {
              model: 'adblockerfile',
              action: ['edit']
            },
            controller: 'AdblockerfileEditCtrl'
          })           
          //adblockerfile end
          //adblockerpush start
          .state('adblocker.adblockerpush', {
            url: '/adblockerpush',
            templateUrl: 'app/adblocker/adblockerpush.list.html',
            data: {
              model: 'adblockerpush',
              action: ['list']
            },
            controller: 'AdblockerpushListCtrl'
          })
          .state('adblocker.add-adblockerpush', {
            url: '/adblockerpush/add',
            templateUrl: 'app/adblocker/adblockerpush.edit.html',
            data: {
              model: 'adblockerpush',
              action: ['add']
            },
            controller: 'AdblockerpushEditCtrl'
          })
          .state('adblocker.edit-adblockerpush', {
            url: '/adblockerpush/:id',
            templateUrl: 'app/adblocker/adblockerpush.edit.html',
            data: {
              model: 'adblockerpush',
              action: ['edit']
            },
            controller: 'AdblockerpushEditCtrl'
          })           
          //adblockerpush end
          //adblockerlocale start
          .state('adblocker.adblockerlocale', {
            url: '/adblockerlocale',
            templateUrl: 'app/adblocker/adblockerlocale.list.html',
            data: {
              model: 'adblockerlocale',
              action: ['list']
            },
            controller: 'AdblockerlocaleListCtrl'
          })
          .state('adblocker.add-adblockerlocale', {
            url: '/adblockerlocale/add',
            templateUrl: 'app/adblocker/adblockerlocale.edit.html',
            data: {
              model: 'adblockerlocale',
              action: ['add']
            },
            controller: 'AdblockerlocaleEditCtrl'
          })
          .state('adblocker.edit-adblockerlocale', {
            url: '/adblockerlocale/:id',
            templateUrl: 'app/adblocker/adblockerlocale.edit.html',
            data: {
              model: 'adblockerlocale',
              action: ['edit']
            },
            controller: 'AdblockerlocaleEditCtrl'
          })           
          //adblockerfile end
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
