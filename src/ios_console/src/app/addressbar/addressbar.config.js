define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('addressbar', {
            abstract: true,
            url: '/addressbar',
            template: '<ui-view/>'
          })
          //hotword
          .state('addressbar.hotWord', {
            url: '/hotWord',
            templateUrl: 'app/addressbar/hotword.list.html',
            data: {
              model: 'hotWord',
              action: ['list']
            },
            controller: 'HotwordListCtrl'
          })
          .state('addressbar.add-hotWord', {
            url: '/hotWord/add',
            templateUrl: 'app/addressbar/hotword.edit.html',
            data: {
              model: 'hotWord',
              action: ['add']
            },
            controller: 'HotwordEditCtrl'
          })
          .state('addressbar.edit-hotWord', {
            url: '/hotWord/:id',
            templateUrl: 'app/addressbar/hotword.edit.html',
            data: {
              model: 'hotWord',
              action: ['edit']
            },
            controller: 'HotwordEditCtrl'
          })           
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
