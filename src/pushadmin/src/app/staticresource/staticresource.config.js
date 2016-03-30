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
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
