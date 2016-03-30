define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('webapps', {
            abstract: true,
            url: '/webapps',
            template: '<ui-view/>'
          })
          .state('webapps.webapp', {
            url: '/webapp',
            templateUrl: 'app/webapps/webapp.list.html',
            data: {
              model: 'webapp',
              action: ['list']
            },
            controller: 'WebappListCtrl'
          })
          .state('webapps.add-webapp', {
            url: '/webapp/add',
            templateUrl: 'app/webapps/webapp.edit.html',
            data: {
              model: 'webapp',
              action: ['add']
            },
            controller: 'WebappEditCtrl'
          })
          .state('webapps.edit-webapp', {
            url: '/webapp/:id',
            templateUrl: 'app/webapps/webapp.edit.html',
            data: {
              model: 'webapp',
              action: ['edit']
            },
            controller: 'WebappEditCtrl'
          })
          .state('webapps.webappsubject', {
            url: '/webappsubject',
            templateUrl: 'app/webapps/webappsubject.list.html',
            data: {
              model: 'webappsubject',
              action: ['list']
            },
            controller: 'WebappsubjectListCtrl'
          })
          .state('webapps.add-webappsubject', {
            url: '/webappsubject/add',
            templateUrl: 'app/webapps/webappsubject.edit.html',
            data: {
              model: 'webappsubject',
              action: ['add']
            },
            controller: 'WebappsubjectEditCtrl'
          })
          .state('webapps.edit-webappsubject', {
            url: '/webappsubject/:id',
            templateUrl: 'app/webapps/webappsubject.edit.html',
            data: {
              model: 'webappsubject',
              action: ['edit']
            },
            controller: 'WebappsubjectEditCtrl'
          })
          .state('webapps.webappcategory', {
            url: '/webappcategory',
            templateUrl: 'app/webapps/webappcategory.list.html',
            data: {
              model: 'webappcategory',
              action: ['list']
            },
            controller: 'WebappcategoryListCtrl'
          })
          .state('webapps.add-webappcategory', {
            url: '/webappcategory/add',
            templateUrl: 'app/webapps/webappcategory.edit.html',
            data: {
              model: 'webappcategory',
              action: ['add']
            },
            controller: 'WebappcategoryEditCtrl'
          })
          .state('webapps.edit-webappcategory', {
            url: '/webappcategory/:id',
            templateUrl: 'app/webapps/webappcategory.edit.html',
            data: {
              model: 'webappcategory',
              action: ['edit']
            },
            controller: 'WebappcategoryEditCtrl'
          })
          .state('webapps.webapprecommend', {
            url: '/webapprecommend',
            templateUrl: 'app/webapps/webapprecommend.list.html',
            data: {
              model: 'webapprecommend',
              action: ['list']
            },
            controller: 'WebapprecommendListCtrl'
          })
          .state('webapps.add-webapprecommend', {
            url: '/webapprecommend/add',
            templateUrl: 'app/webapps/webapprecommend.edit.html',
            data: {
              model: 'webapprecommend',
              action: ['add']
            },
            controller: 'WebapprecommendEditCtrl'
          })
          .state('webapps.edit-webapprecommend', {
            url: '/webapprecommend/:id',
            templateUrl: 'app/webapps/webapprecommend.edit.html',
            data: {
              model: 'webapprecommend',
              action: ['edit']
            },
            controller: 'WebapprecommendEditCtrl'
          })

        /*add state to here*/
      }
    ]);
    return mod;
  };
});
