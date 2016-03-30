define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('pcpushservice', {
            abstract: true,
            url: '/pcpushservice',
            template: '<ui-view/>'
          })
          .state('pcpushservice.pcbookmark', {
            url: '/pcbookmark',
            templateUrl: 'app/pcpushservice/pcbookmark.list.html',
            data: {
              model: 'pcbookmark',
              action: ['list']
            },
            controller: 'pcBookmarkListCtrl'
          })
          .state('pcpushservice.add-pcbookmark', {
            url: '/pcbookmark/add',
            templateUrl: 'app/pcpushservice/pcbookmark.edit.html',
            data: {
              model: 'pcbookmark',
              action: ['add']
            },
            controller: 'pcBookmarkEditCtrl'
          })
          .state('pcpushservice.edit-pcbookmark', {
            url: '/pcbookmark/:id',
            templateUrl: 'app/pcpushservice/pcbookmark.edit.html',
            data: {
              model: 'pcbookmark',
              action: ['edit']
            },
            controller: 'pcBookmarkEditCtrl'
          })
          .state('pcpushservice.pcbookmarkpush', {
            url: '/pcbookmarkpush',
            templateUrl: 'app/pcpushservice/pcbookmarkpush.list.html',
            data: {
              model: 'pcbookmarkpush',
              action: ['list']
            },
            controller: 'pcBookmarkpushListCtrl'
          })
          .state('pcpushservice.add-pcbookmarkpush', {
            url: '/pcbookmarkpush/add',
            templateUrl: 'app/pcpushservice/pcbookmarkpush.edit.html',
            data: {
              model: 'pcbookmarkpush',
              action: ['add']
            },
            controller: 'pcBookmarkpushEditCtrl'
          })
          .state('pcpushservice.edit-pcbookmarkpush', {
            url: '/pcbookmarkpush/:id',
            templateUrl: 'app/pcpushservice/pcbookmarkpush.edit.html',
            data: {
              model: 'pcbookmarkpush',
              action: ['edit']
            },
            controller: 'pcBookmarkpushEditCtrl'
          })
          
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
