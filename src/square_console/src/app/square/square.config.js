define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('square', {
            abstract: true,
            url: '/square',
            template: '<ui-view/>'
          })
          .state('square.category', {
            url: '/category',
            templateUrl: 'app/square/category.list.html',
            data: {
              model: 'category',
              action: ['list']
            },
            controller: 'CategoryListCtrl'
          })
          .state('square.add-category', {
            url: '/category/add',
            templateUrl: 'app/square/category.edit.html',
            data: {
              model: 'category',
              action: ['add']
            },
            controller: 'CategoryEditCtrl'
          })
          .state('square.edit-category', {
            url: '/category/:id',
            templateUrl: 'app/square/category.edit.html',
            data: {
              model: 'category',
              action: ['edit']
            },
            controller: 'CategoryEditCtrl'
          })
          .state('square.hotapp', {
            url: '/hotapp',
            templateUrl: 'app/square/hotapp.list.html',
            data: {
              model: 'hotapp',
              action: ['list']
            },
            controller: 'HotappListCtrl'
          })
          .state('square.add-hotapp', {
            url: '/hotapp/add',
            templateUrl: 'app/square/hotapp.edit.html',
            data: {
              model: 'hotapp',
              action: ['add']
            },
            controller: 'HotappEditCtrl'
          })
          .state('square.edit-hotapp', {
            url: '/hotapp/:id',
            templateUrl: 'app/square/hotapp.edit.html',
            data: {
              model: 'hotapp',
              action: ['edit']
            },
            controller: 'HotappEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
