define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('promotionservice', {
            abstract: true,
            url: '/promotionservice',
            template: '<ui-view/>'
          })
          .state('promotionservice.promotionspeeddial', {
            url: '/promotionspeeddial',
            templateUrl: 'app/promotionservice/promotionspeeddial.list.html',
            data: {
              model: 'promotionspeeddial',
              action: ['list']
            },
            controller: 'PromotionspeeddialListCtrl'
          })
          .state('promotionservice.add-promotionspeeddial', {
            url: '/promotionspeeddial/add',
            templateUrl: 'app/promotionservice/promotionspeeddial.edit.html',
            data: {
              model: 'promotionspeeddial',
              action: ['add']
            },
            controller: 'PromotionspeeddialEditCtrl'
          })
          .state('promotionservice.edit-promotionspeeddial', {
            url: '/promotionspeeddial/:id',
            templateUrl: 'app/promotionservice/promotionspeeddial.edit.html',
            data: {
              model: 'promotionspeeddial',
              action: ['edit']
            },
            controller: 'PromotionspeeddialEditCtrl'
          })
            .state('promotionservice.promotionurl', {
              url: '/promotionurl',
              templateUrl: 'app/promotionservice/promotionurl.list.html',
              data: {
                model: 'promotionurl',
                action: ['list']
              },
              controller: 'PromotionurlListCtrl'
            })
            .state('promotionservice.add-promotionurl', {
              url: '/promotionurl/add',
              templateUrl: 'app/promotionservice/promotionurl.edit.html',
              data: {
                model: 'promotionurl',
                action: ['add']
              },
              controller: 'PromotionurlEditCtrl'
            })
            .state('promotionservice.edit-promotionurl', {
              url: '/promotionurl/:id',
              templateUrl: 'app/promotionservice/promotionurl.edit.html',
              data: {
                model: 'promotionurl',
                action: ['edit']
              },
              controller: 'PromotionurlEditCtrl'
            })
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
