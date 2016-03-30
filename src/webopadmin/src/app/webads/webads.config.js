define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('webads', {
            abstract: true,
            url: '/webads',
            template: '<ui-view/>'
          })
          //applist start
          .state('webads.applist', {
            url: '/applist',
            templateUrl: 'app/webads/applist.list.html',
            data: {
              model: 'applist',
              action: ['list']
            },
            controller: 'ApplistListCtrl'
          })
          .state('webads.add-applist', {
            url: '/applist/add',
            templateUrl: 'app/webads/applist.edit.html',
            data: {
              model: 'applist',
              action: ['add']
            },
            controller: 'ApplistEditCtrl'
          })
          .state('webads.edit-applist', {
            url: '/applist/:id',
            templateUrl: 'app/webads/applist.edit.html',
            data: {
              model: 'applist',
              action: ['edit']
            },
            controller: 'ApplistEditCtrl'
          })
          //applist end
          .state('webads.appads', {
            url: '/appads',
            templateUrl: 'app/webads/appads.list.html',
            data: {
              model: 'appads',
              action: ['list']
            },
            controller: 'AppadsListCtrl'
          })
          .state('webads.add-appads', {
            url: '/appads/add',
            templateUrl: 'app/webads/appads.edit.html',
            data: {
              model: 'appads',
              action: ['add']
            },
            controller: 'AppadsEditCtrl'
          })
          .state('webads.edit-appads', {
            url: '/appads/:id',
            templateUrl: 'app/webads/appads.edit.html',
            data: {
              model: 'appads',
              action: ['edit']
            },
            controller: 'AppadsEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
