define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('turbotportrait', {
            abstract: true,
            url: '/turbotportrait',
            template: '<ui-view/>'
          })
          .state('turbotportrait.usertag', {
            url: '/usertag',
            templateUrl: 'app/turbotportrait/usertag.list.html',
            data: {
              model: 'usertag',
              action: ['list']
            },
            controller: 'UsertagListCtrl'
          })
          .state('turbotportrait.add-usertag', {
            url: '/usertag/add',
            templateUrl: 'app/turbotportrait/usertag.edit.html',
            data: {
              model: 'usertag',
              action: ['add']
            },
            controller: 'UsertagEditCtrl'
          })
          .state('turbotportrait.edit-usertag', {
            url: '/usertag/:id',
            templateUrl: 'app/turbotportrait/usertag.edit.html',
            data: {
              model: 'usertag',
              action: ['edit']
            },
            controller: 'UsertagEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
