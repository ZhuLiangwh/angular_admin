define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('thememarket', {
            abstract: true,
            url: '/thememarket',
            template: '<ui-view/>'
          })
          //theme
          .state('thememarket.theme', {
            url: '/theme',
            templateUrl: 'app/thememarket/theme.list.html',
            data: {
              model: 'theme',
              action: ['list']
            },
            controller: 'ThemeListCtrl'
          })
          .state('thememarket.add-theme', {
            url: '/theme/add',
            templateUrl: 'app/thememarket/theme.edit.html',
            data: {
              model: 'theme',
              action: ['add']
            },
            controller: 'ThemeEditCtrl'
          })
          .state('thememarket.edit-theme', {
            url: '/theme/:id',
            templateUrl: 'app/thememarket/theme.edit.html',
            data: {
              model: 'theme',
              action: ['edit']
            },
            controller: 'ThemeEditCtrl'
          })
          //theme end
          //themelocale
          .state('thememarket.themelocale', {
            url: '/themelocale',
            templateUrl: 'app/thememarket/themelocale.list.html',
            data: {
              model: 'themelocale',
              action: ['list']
            },
            controller: 'ThemelocaleListCtrl'
          })
          .state('thememarket.add-themelocale', {
            url: '/themelocale/add',
            templateUrl: 'app/thememarket/themelocale.edit.html',
            data: {
              model: 'themelocale',
              action: ['add']
            },
            controller: 'ThemelocaleEditCtrl'
          })
          .state('thememarket.edit-themelocale', {
            url: '/themelocale/:id',
            templateUrl: 'app/thememarket/themelocale.edit.html',
            data: {
              model: 'themelocale',
              action: ['edit']
            },
            controller: 'ThemelocaleEditCtrl'
          })
          //themelocal
          //themepush
          .state('thememarket.themepush', {
            url: '/themepush',
            templateUrl: 'app/thememarket/themepush.list.html',
            data: {
              model: 'themepush',
              action: ['list']
            },
            controller: 'ThemepushListCtrl'
          })
          .state('thememarket.add-themepush', {
            url: '/themepush/add',
            templateUrl: 'app/thememarket/themepush.edit.html',
            data: {
              model: 'themepush',
              action: ['add']
            },
            controller: 'ThemepushEditCtrl'
          })
          .state('thememarket.edit-themepush', {
            url: '/themepush/:id',
            templateUrl: 'app/thememarket/themepush.edit.html',
            data: {
              model: 'themepush',
              action: ['edit']
            },
            controller: 'ThemepushEditCtrl'
          })
          //themepush
          //themefolder
          .state('thememarket.themefolder', {
            url: '/themefolder',
            templateUrl: 'app/thememarket/themefolder.list.html',
            data: {
              model: 'themefolder',
              action: ['list']
            },
            controller: 'ThemefolderListCtrl'
          })
          .state('thememarket.add-themefolder', {
            url: '/themefolder/add',
            templateUrl: 'app/thememarket/themefolder.edit.html',
            data: {
              model: 'themefolder',
              action: ['add']
            },
            controller: 'ThemefolderEditCtrl'
          })
          .state('thememarket.edit-themefolder', {
            url: '/themefolder/:id',
            templateUrl: 'app/thememarket/themefolder.edit.html',
            data: {
              model: 'Themefolder',
              action: ['edit']
            },
            controller: 'ThemefolderEditCtrl'
          })
          //themefolder end
          
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
