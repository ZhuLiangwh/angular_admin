define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('newthemestore', {
            abstract: true,
            url: '/newthemestore',
            template: '<ui-view/>'
          })
          //athemefeatured  start
          .state('newthemestore.athemefeatured', {
            url: '/athemefeatured',
            templateUrl: 'app/newthemestore/athemefeatured.list.html',
            data: {
              model: 'athemefeatured',
              action: ['list']
            },
            controller: 'AthemefeaturedListCtrl'
          })
          .state('newthemestore.add-athemefeatured', {
            url: '/athemefeatured/add',
            templateUrl: 'app/newthemestore/athemefeatured.edit.html',
            data: {
              model: 'athemefeatured',
              action: ['add']
            },
            controller: 'AthemefeaturedEditCtrl'
          })
          .state('newthemestore.edit-athemefeatured', {
            url: '/athemefeatured/:id',
            templateUrl: 'app/newthemestore/athemefeatured.edit.html',
            data: {
              model: 'athemefeatured',
              action: ['edit']
            },
            controller: 'AthemefeaturedEditCtrl'
          })
          //athemefeatured  end
          //athemecategory  start
          .state('newthemestore.athemecategory', {
            url: '/athemecategory',
            templateUrl: 'app/newthemestore/athemecategory.list.html',
            data: {
              model: 'athemecategory',
              action: ['list']
            },
            controller: 'AthemecategoryListCtrl'
          })
          .state('newthemestore.add-athemecategory', {
            url: '/athemecategory/add',
            templateUrl: 'app/newthemestore/athemecategory.edit.html',
            data: {
              model: 'athemecategory',
              action: ['add']
            },
            controller: 'AthemecategoryEditCtrl'
          })
          .state('newthemestore.edit-athemecategory', {
            url: '/athemecategory/:id',
            templateUrl: 'app/newthemestore/athemecategory.edit.html',
            data: {
              model: 'athemecategory',
              action: ['edit']
            },
            controller: 'AthemecategoryEditCtrl'
          })
          //athemefeatured  end
          //athemepushstore start
          .state('newthemestore.athemepushstore', {
            url: '/athemepushstore',
            templateUrl: 'app/newthemestore/athemepushstore.list.html',
            data: {
              model: 'athemepushstore',
              action: ['list']
            },
            controller: 'AthemepushstoreListCtrl'
          })
          .state('newthemestore.add-athemepushstore', {
            url: '/athemepushstore/add',
            templateUrl: 'app/newthemestore/athemepushstore.edit.html',
            data: {
              model: 'athemepushstore',
              action: ['add']
            },
            controller: 'AthemepushstoreEditCtrl'
          })
          .state('newthemestore.edit-athemepushstore', {
            url: '/athemepushstore/:id',
            templateUrl: 'app/newthemestore/athemepushstore.edit.html',
            data: {
              model: 'athemepushstore',
              action: ['edit']
            },
            controller: 'AthemepushstoreEditCtrl'
          })
          //athemepushstore end
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
