define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('themestore', {
            abstract: true,
            url: '/themestore',
            template: '<ui-view/>'
          })
          .state('themestore.theme', {
            url: '/theme',
            templateUrl: 'app/themestore/theme.list.html',
            data: {
              model: 'theme',
              action: ['list']
            },
            controller: 'ThemeListCtrl'
          })
          .state('themestore.add-theme', {
            url: '/theme/add',
            templateUrl: 'app/themestore/theme.edit.html',
            data: {
              model: 'theme',
              action: ['add']
            },
            controller: 'ThemeEditCtrl'
          })
          .state('themestore.edit-theme', {
            url: '/theme/:id',
            templateUrl: 'app/themestore/theme.edit.html',
            data: {
              model: 'theme',
              action: ['edit']
            },
            controller: 'ThemeEditCtrl'
          })
          .state('themestore.themesubject', {
            url: '/themesubject',
            templateUrl: 'app/themestore/themesubject.list.html',
            data: {
              model: 'themesubject',
              action: ['list']
            },
            controller: 'ThemesubjectListCtrl'
          })
          .state('themestore.add-themesubject', {
            url: '/themesubject/add',
            templateUrl: 'app/themestore/themesubject.edit.html',
            data: {
              model: 'themesubject',
              action: ['add']
            },
            controller: 'ThemesubjectEditCtrl'
          })
          .state('themestore.edit-themesubject', {
            url: '/themesubject/:id',
            templateUrl: 'app/themestore/themesubject.edit.html',
            data: {
              model: 'themesubject',
              action: ['edit']
            },
            controller: 'ThemesubjectEditCtrl'
          })
          .state('themestore.themecategory', {
            url: '/themecategory',
            templateUrl: 'app/themestore/themecategory.list.html',
            data: {
              model: 'themecategory',
              action: ['list']
            },
            controller: 'ThemecategoryListCtrl'
          })
          .state('themestore.add-themecategory', {
            url: '/themecategory/add',
            templateUrl: 'app/themestore/themecategory.edit.html',
            data: {
              model: 'themecategory',
              action: ['add']
            },
            controller: 'ThemecategoryEditCtrl'
          })
          .state('themestore.edit-themecategory', {
            url: '/themecategory/:id',
            templateUrl: 'app/themestore/themecategory.edit.html',
            data: {
              model: 'themecategory',
              action: ['edit']
            },
            controller: 'ThemecategoryEditCtrl'
          })
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
