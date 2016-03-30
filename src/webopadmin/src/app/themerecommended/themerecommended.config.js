define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('themerecommended', {
            abstract: true,
            url: '/themerecommended',
            template: '<ui-view/>'
          })
          //athemepushhome start
          .state('themerecommended.athemepushhome', {
            url: '/athemepushhome',
            templateUrl: 'app/themerecommended/athemepushhome.list.html',
            data: {
              model: 'athemepushhome',
              action: ['list']
            },
            controller: 'AthemepushhomeListCtrl'
          })
          .state('themerecommended.add-athemepushhome', {
            url: '/athemepushhome/add',
            templateUrl: 'app/themerecommended/athemepushhome.edit.html',
            data: {
              model: 'athemepushhome',
              action: ['add']
            },
            controller: 'AthemepushhomeEditCtrl'
          })
          .state('themerecommended.edit-athemepushhome', {
            url: '/athemepushhome/:id',
            templateUrl: 'app/themerecommended/athemepushhome.edit.html',
            data: {
              model: 'athemepushhome',
              action: ['edit']
            },
            controller: 'AthemepushhomeEditCtrl'
          })
          //athemepushhome end
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
