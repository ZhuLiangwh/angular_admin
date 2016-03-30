define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('aosrule', {
            abstract: true,
            url: '/aosrule',
            template: '<ui-view/>'
          })
          .state('aosrule.aosoperator', {
            url: '/aosoperator',
            templateUrl: 'app/aosrule/aosoperator.list.html',
            data: {
              model: 'aosoperator',
              action: ['list']
            },
            controller: 'AosoperatorListCtrl'
          })
          .state('aosrule.add-aosoperator', {
            url: '/aosoperator/add',
            templateUrl: 'app/aosrule/aosoperator.edit.html',
            data: {
              model: 'aosoperator',
              action: ['add']
            },
            controller: 'AosoperatorEditCtrl'
          })
          .state('aosrule.edit-aosoperator', {
            url: '/aosoperator/:id',
            templateUrl: 'app/aosrule/aosoperator.edit.html',
            data: {
              model: 'aosoperator',
              action: ['edit']
            },
            controller: 'AosoperatorEditCtrl'
          })
          .state('aosrule.aospackage', {
            url: '/aospackage',
            templateUrl: 'app/aosrule/aospackage.list.html',
            data: {
              model: 'aospackage',
              action: ['list']
            },
            controller: 'AospackageListCtrl'
          })
          .state('aosrule.add-aospackage', {
            url: '/aospackage/add',
            templateUrl: 'app/aosrule/aospackage.edit.html',
            data: {
              model: 'aospackage',
              action: ['add']
            },
            controller: 'AospackageEditCtrl'
          })
          .state('aosrule.edit-aospackage', {
            url: '/aospackage/:id',
            templateUrl: 'app/aosrule/aospackage.edit.html',
            data: {
              model: 'aospackage',
              action: ['edit']
            },
            controller: 'AospackageEditCtrl'
          })
          .state('aosrule.aosruledata', {
            url: '/aosruledata',
            templateUrl: 'app/aosrule/aosruledata.list.html',
            data: {
              model: 'aosruledata',
              action: ['list']
            },
            controller: 'AosruledataListCtrl'
          })
          .state('aosrule.add-aosruledata', {
            url: '/aosruledata/add',
            templateUrl: 'app/aosrule/aosruledata.edit.html',
            data: {
              model: 'aosruledata',
              action: ['add']
            },
            controller: 'AosruledataEditCtrl'
          })
          .state('aosrule.edit-aosruledata', {
            url: '/aosruledata/:id',
            templateUrl: 'app/aosrule/aosruledata.edit.html',
            data: {
              model: 'aosruledata',
              action: ['edit']
            },
            controller: 'AosruledataEditCtrl'
          })
          .state('aosrule.aossource', {
            url: '/aossource',
            templateUrl: 'app/aosrule/aossource.list.html',
            data: {
              model: 'aossource',
              action: ['list']
            },
            controller: 'AossourceListCtrl'
          })
          .state('aosrule.add-aossource', {
            url: '/aossource/add',
            templateUrl: 'app/aosrule/aossource.edit.html',
            data: {
              model: 'aossource',
              action: ['add']
            },
            controller: 'AossourceEditCtrl'
          })
          .state('aosrule.edit-aossource', {
            url: '/source/:id',
            templateUrl: 'app/aosrule/aossource.edit.html',
            data: {
              model: 'aossource',
              action: ['edit']
            },
            controller: 'AossourceEditCtrl'
          })
          .state('aosrule.aoslocale', {
            url: '/aoslocale',
            templateUrl: 'app/aosrule/aoslocale.list.html',
            data: {
              model: 'aoslocale',
              action: ['list']
            },
            controller: 'AoslocaleListCtrl'
          })
          .state('aosrule.add-aoslocale', {
            url: '/aoslocale/add',
            templateUrl: 'app/aosrule/aoslocale.edit.html',
            data: {
              model: 'aoslocale',
              action: ['add']
            },
            controller: 'AoslocaleEditCtrl'
          })
          .state('aosrule.edit-aoslocale', {
            url: '/aoslocale/:id',
            templateUrl: 'app/aosrule/aoslocale.edit.html',
            data: {
              model: 'aoslocale',
              action: ['edit']
            },
            controller: 'AoslocaleEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
