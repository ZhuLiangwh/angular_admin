define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('staticresource', {
            abstract: true,
            url: '/staticresource',
            template: '<ui-view/>'
          })
          .state('staticresource.icon', {
            url: '/icon',
            templateUrl: 'app/staticresource/icon.list.html',
            data: {
              model: 'icon',
              action: ['list']
            },
            controller: 'IconListCtrl'
          })
          .state('staticresource.add-icon', {
            url: '/icon/add',
            templateUrl: 'app/staticresource/icon.edit.html',
            data: {
              model: 'icon',
              action: ['add']
            },
            controller: 'IconEditCtrl'
          })
          .state('staticresource.edit-icon', {
            url: '/icon/:id',
            templateUrl: 'app/staticresource/icon.edit.html',
            data: {
              model: 'icon',
              action: ['edit']
            },
            controller: 'IconEditCtrl'
          })
          .state('staticresource.apk', {
            url: '/apk',
            templateUrl: 'app/staticresource/apk.list.html',
            data: {
              model: 'apk',
              action: ['list']
            },
            controller: 'ApkListCtrl'
          })
          .state('staticresource.add-apk', {
            url: '/apk/add',
            templateUrl: 'app/staticresource/apk.edit.html',
            data: {
              model: 'apk',
              action: ['add']
            },
            controller: 'ApkEditCtrl'
          })
          .state('staticresource.edit-apk', {
            url: '/apk/:id',
            templateUrl: 'app/staticresource/apk.edit.html',
            data: {
              model: 'apk',
              action: ['edit']
            },
            controller: 'ApkEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
