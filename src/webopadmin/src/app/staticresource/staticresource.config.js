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
          //atheme start
          .state('staticresource.atheme', {
            url: '/atheme',
            templateUrl: 'app/staticresource/atheme.list.html',
            data: {
              model: 'atheme',
              action: ['list']
            },
            controller: 'AthemeListCtrl'
          })
          .state('staticresource.add-atheme', {
            url: '/atheme/add',
            templateUrl: 'app/staticresource/atheme.edit.html',
            data: {
              model: 'atheme',
              action: ['add']
            },
            controller: 'AthemeEditCtrl'
          })
          .state('staticresource.edit-atheme', {
            url: '/atheme/:id',
            templateUrl: 'app/staticresource/atheme.edit.html',
            data: {
              model: 'atheme',
              action: ['edit']
            },
            controller: 'AthemeEditCtrl'
          })
          //atheme end
          //athemelocale start
          .state('staticresource.athemelocale', {
            url: '/athemelocale',
            templateUrl: 'app/staticresource/athemelocale.list.html',
            data: {
              model: 'athemelocale',
              action: ['list']
            },
            controller: 'AthemelocaleListCtrl'
          })
          .state('staticresource.add-athemelocale', {
            url: '/athemelocale/add',
            templateUrl: 'app/staticresource/athemelocale.edit.html',
            data: {
              model: 'athemelocale',
              action: ['add']
            },
            controller: 'AthemelocaleEditCtrl'
          })
          .state('staticresource.edit-athemelocale', {
            url: '/athemelocale/:id',
            templateUrl: 'app/staticresource/athemelocale.edit.html',
            data: {
              model: 'athemelocale',
              action: ['edit']
            },
            controller: 'AthemelocaleEditCtrl'
          })
          //athemelocale  end
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
