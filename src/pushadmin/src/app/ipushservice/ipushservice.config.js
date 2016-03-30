define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('ipushservice', {
            abstract: true,
            url: '/ipushservice',
            template: '<ui-view/>'
          })
          //iurloption
          .state('ipushservice.iurloption', {
            url: '/iurloption',
            templateUrl: 'app/ipushservice/urloption.list.html',
            data: {
              model: 'iurloption',
              action: ['list']
            },
            controller: 'UrloptionListCtrl'
          })
          .state('ipushservice.add-iurloption', {
            url: '/iurloption/add',
            templateUrl: 'app/ipushservice/urloption.edit.html',
            data: {
              model: 'iurloption',
              action: ['add']
            },
            controller: 'UrloptionEditCtrl'
          })
          .state('ipushservice.edit-iurloption', {
            url: '/iurloption/:id',
            templateUrl: 'app/ipushservice/urloption.edit.html',
            data: {
              model: 'iurloption',
              action: ['edit']
            },
            controller: 'UrloptionEditCtrl'
          })
          //iurloption  end
          //iurloptionfolder
          .state('ipushservice.iurloptionfolder', {
            url: '/iurloptionfolder',
            templateUrl: 'app/ipushservice/urloptionfolder.list.html',
            data: {
              model: 'iurloptionfolder',
              action: ['list']
            },
            controller: 'UrloptionfolderListCtrl'
          })
          .state('ipushservice.add-iurloptionfolder', {
            url: '/iurloptionfolder/add',
            templateUrl: 'app/ipushservice/urloptionfolder.edit.html',
            data: {
              model: 'iurloptionfolder',
              action: ['add']
            },
            controller: 'UrloptionfolderEditCtrl'
          })
          .state('ipushservice.edit-iurloptionfolder', {
            url: '/iurloptionfolder/:id',
            templateUrl: 'app/ipushservice/urloptionfolder.edit.html',
            data: {
              model: 'iurloptionfolder',
              action: ['edit']
            },
            controller: 'UrloptionfolderEditCtrl'
          })
          //iurloptionfolder  end
          //iapppush
          .state('ipushservice.iapppush', {
            url: '/iapppush',
            templateUrl: 'app/ipushservice/apppush.list.html',
            data: {
              model: 'iapppush',
              action: ['list']
            },
            controller: 'ApppushListCtrl'
          })
          .state('ipushservice.add-iapppush', {
            url: '/iapppush/add',
            templateUrl: 'app/ipushservice/apppush.edit.html',
            data: {
              model: 'iapppush',
              action: ['add']
            },
            controller: 'ApppushEditCtrl'
          })
          .state('ipushservice.edit-iapppush', {
            url: '/iapppush/:id',
            templateUrl: 'app/ipushservice/apppush.edit.html',
            data: {
              model: 'iapppush',
              action: ['edit']
            },
            controller: 'ApppushEditCtrl'
          })
          //iapppush  end
          //ispeeddial
          .state('ipushservice.ispeeddial', {
            url: '/ispeeddial',
            templateUrl: 'app/ipushservice/speeddial.list.html',
            data: {
              model: 'ispeeddial',
              action: ['list']
            },
            controller: 'iSpeeddialListCtrl'
          })
          .state('ipushservice.add-ispeeddial', {
            url: '/ispeeddial/add',
            templateUrl: 'app/ipushservice/speeddial.edit.html',
            data: {
              model: 'ispeeddial',
              action: ['add']
            },
            controller: 'iSpeeddialEditCtrl'
          })
          .state('ipushservice.edit-ispeeddial', {
            url: '/ispeeddial/:id',
            templateUrl: 'app/ipushservice/speeddial.edit.html',
            data: {
              model: 'ispeeddial',
              action: ['edit']
            },
            controller: 'iSpeeddialEditCtrl'
          })
          //ispeeddial  end
          //ispeeddialfolder
          .state('ipushservice.ispeeddialfolder', {
            url: '/ispeeddialfolder',
            templateUrl: 'app/ipushservice/speeddialfolder.list.html',
            data: {
              model: 'speeddialfolder',
              action: ['list']
            },
            controller: 'iSpeeddialfolderListCtrl'
          })
          .state('ipushservice.add-ispeeddialfolder', {
            url: '/ispeeddialfolder/add',
            templateUrl: 'app/ipushservice/speeddialfolder.edit.html',
            data: {
              model: 'speeddialfolder',
              action: ['add']
            },
            controller: 'iSpeeddialfolderEditCtrl'
          })
          .state('ipushservice.edit-ispeeddialfolder', {
            url: '/ispeeddialfolder/:id',
            templateUrl: 'app/ipushservice/speeddialfolder.edit.html',
            data: {
              model: 'speeddialfolder',
              action: ['edit']
            },
            controller: 'iSpeeddialfolderEditCtrl'
          })
          //ispeeddialfolder  end
          //speeddialpush
          .state('ipushservice.ispeeddialpush', {
            url: '/ispeeddialpush',
            templateUrl: 'app/ipushservice/speeddialpush.list.html',
            data: {
              model: 'speeddialpush',
              action: ['list']
            },
            controller: 'iSpeeddialpushListCtrl'
          })
          .state('ipushservice.add-ispeeddialpush', {
            url: '/ispeeddialpush/add',
            templateUrl: 'app/ipushservice/speeddialpush.edit.html',
            data: {
              model: 'speeddialpush',
              action: ['add']
            },
            controller: 'iSpeeddialpushEditCtrl'
          })
          .state('ipushservice.edit-ispeeddialpush', {
            url: '/ispeeddialpush/:id',
            templateUrl: 'app/ipushservice/speeddialpush.edit.html',
            data: {
              model: 'speeddialpush',
              action: ['edit']
            },
            controller: 'iSpeeddialpushEditCtrl'
          })
          //speeddialpush  end
          //ibookmark
          .state('ipushservice.ibookmark', {
            url: '/ibookmark',
            templateUrl: 'app/ipushservice/bookmark.list.html',
            data: {
              model: 'bookmark',
              action: ['list']
            },
            controller: 'iBookmarkListCtrl'
          })
          .state('ipushservice.add-ibookmark', {
            url: '/ibookmark/add',
            templateUrl: 'app/ipushservice/bookmark.edit.html',
            data: {
              model: 'bookmark',
              action: ['add']
            },
            controller: 'iBookmarkEditCtrl'
          })
          .state('ipushservice.edit-ibookmark', {
            url: '/ibookmark/:id',
            templateUrl: 'app/ipushservice/bookmark.edit.html',
            data: {
              model: 'bookmark',
              action: ['edit']
            },
            controller: 'iBookmarkEditCtrl'
          })
          //ibookmark  end
          //ibookmarkfolder
          .state('ipushservice.ibookmarkfolder', {
            url: '/ibookmarkfolder',
            templateUrl: 'app/ipushservice/bookmarkfolder.list.html',
            data: {
              model: 'bookmarkfolder',
              action: ['list']
            },
            controller: 'iBookmarkfolderListCtrl'
          })
          .state('ipushservice.add-ibookmarkfolder', {
            url: '/ibookmarkfolder/add',
            templateUrl: 'app/ipushservice/bookmarkfolder.edit.html',
            data: {
              model: 'bookmarkfolder',
              action: ['add']
            },
            controller: 'iBookmarkfolderEditCtrl'
          })
          .state('ipushservice.edit-ibookmarkfolder', {
            url: '/ibookmarkfolder/:id',
            templateUrl: 'app/ipushservice/bookmarkfolder.edit.html',
            data: {
              model: 'bookmark',
              action: ['edit']
            },
            controller: 'iBookmarkfolderEditCtrl'
          })
          //ibookmarkfolder  end
          //ibookmarkpush
          .state('ipushservice.ibookmarkpush', {
            url: '/ibookmarkpush',
            templateUrl: 'app/ipushservice/bookmarkpush.list.html',
            data: {
              model: 'bookmarkpush',
              action: ['list']
            },
            controller: 'iBookmarkpushListCtrl'
          })
          .state('ipushservice.add-ibookmarkpush', {
            url: '/ibookmarkpush/add',
            templateUrl: 'app/ipushservice/bookmarkpush.edit.html',
            data: {
              model: 'bookmarkpush',
              action: ['add']
            },
            controller: 'iBookmarkpushEditCtrl'
          })
          .state('ipushservice.edit-ibookmarkpush', {
            url: '/ibookmarkpush/:id',
            templateUrl: 'app/ipushservice/bookmarkpush.edit.html',
            data: {
              model: 'bookmarkpush',
              action: ['edit']
            },
            controller: 'iBookmarkpushEditCtrl'
          })
          //ibookmarkpush  end
          //isearcher
          .state('ipushservice.isearcher', {
              url: '/isearcher',
              templateUrl: 'app/ipushservice/searcher.list.html',
              data: {
                model: 'searcher',
                action: ['list']
              },
              controller: 'iSearcherListCtrl'
          })
          .state('ipushservice.add-isearcher', {
            url: '/isearcher/add',
            templateUrl: 'app/ipushservice/searcher.edit.html',
            data: {
              model: 'searcher',
              action: ['add']
            },
            controller: 'iSearcherEditCtrl'
          })
          .state('ipushservice.edit-isearcher', {
            url: '/isearcher/:id',
            templateUrl: 'app/ipushservice/searcher.edit.html',
            data: {
              model: 'searcher',
              action: ['edit']
            },
            controller: 'iSearcherEditCtrl'
          })
          //isearcher  end
          //isearcherpush
          .state('ipushservice.isearcherpush', {
            url: '/isearcherpush',
            templateUrl: 'app/ipushservice/searcherpush.list.html',
            data: {
              model: 'searcherpush',
              action: ['list']
            },
            controller: 'iSearcherpushListCtrl'
          })
          .state('ipushservice.add-isearcherpush', {
            url: '/isearcherpush/add',
            templateUrl: 'app/ipushservice/searcherpush.edit.html',
            data: {
              model: 'searcherpush',
              action: ['add']
            },
            controller: 'iSearcherpushEditCtrl'
          })
          .state('ipushservice.edit-isearcherpush', {
            url: '/isearcherpush/:id',
            templateUrl: 'app/ipushservice/searcherpush.edit.html',
            data: {
              model: 'searcherpush',
              action: ['edit']
            },
            controller: 'iSearcherpushEditCtrl'
          })
          //isearcherpush  end
          //ilinkpush
          .state('ipushservice.ilinkpush', {
            url: '/ilinkpush',
            templateUrl: 'app/ipushservice/promotionurl.list.html',
            data: {
              model: 'ilinkpush',
              action: ['list']
            },
            controller: 'iPromotionurlListCtrl'
          })
          .state('ipushservice.add-ilinkpush', {
            url: '/ilinkpush/add',
            templateUrl: 'app/ipushservice/promotionurl.edit.html',
            data: {
              model: 'ilinkpush',
              action: ['add']
            },
            controller: 'iPromotionurlEditCtrl'
          })
          .state('ipushservice.edit-ilinkpush', {
            url: '/ilinkpush/:id',
            templateUrl: 'app/ipushservice/promotionurl.edit.html',
            data: {
              model: 'ilinkpush',
              action: ['edit']
            },
            controller: 'iPromotionurlEditCtrl'
          })
          //ilinkpush  end
          //amazonurl
          .state('ipushservice.amazonurl', {
            url: '/amazonurl',
            templateUrl: 'app/ipushservice/amazonurl.list.html',
            data: {
              model: 'amazonurl',
              action: ['list']
            },
            controller: 'AmazonurlListCtrl'
          })
          .state('ipushservice.add-amazonurl', {
            url: '/amazonurl/add',
            templateUrl: 'app/ipushservice/amazonurl.edit.html',
            data: {
              model: 'amazonurl',
              action: ['add']
            },
            controller: 'AmazonurlEditCtrl'
          })
          .state('ipushservice.edit-amazonurl', {
            url: '/amazonurl/:id',
            templateUrl: 'app/ipushservice/amazonurl.edit.html',
            data: {
              model: 'amazonurl',
              action: ['edit']
            },
            controller: 'AmazonurlEditCtrl'
          })
          //amazonurl  end
          //urlitem
          .state('ipushservice.urlitem', {
            url: '/urlitem',
            templateUrl: 'app/ipushservice/urlitem.list.html',
            data: {
              model: 'urlitem',
              action: ['list']
            },
            controller: 'UrlitemListCtrl'
          })
          .state('ipushservice.add-urlitem', {
            url: '/urlitem/add',
            templateUrl: 'app/ipushservice/urlitem.edit.html',
            data: {
              model: 'urlitem',
              action: ['add']
            },
            controller: 'UrlitemEditCtrl'
          })
          .state('ipushservice.edit-urlitem', {
            url: '/urlitem/:id',
            templateUrl: 'app/ipushservice/urlitem.edit.html',
            data: {
              model: 'urlitem',
              action: ['edit']
            },
            controller: 'UrlitemEditCtrl'
          })
          //urlitem  end
          //urlparam
          .state('ipushservice.urlparam', {
            url: '/urlparam',
            templateUrl: 'app/ipushservice/urlparam.list.html',
            data: {
              model: 'urlparam',
              action: ['list']
            },
            controller: 'UrlparamListCtrl'
          })
          .state('ipushservice.add-urlparam', {
            url: '/urlparam/add',
            templateUrl: 'app/ipushservice/urlparam.edit.html',
            data: {
              model: 'urlparam',
              action: ['add']
            },
            controller: 'UrlparamEditCtrl'
          })
          .state('ipushservice.edit-urlparam', {
            url: '/urlparam/:id',
            templateUrl: 'app/ipushservice/urlparam.edit.html',
            data: {
              model: 'urlparam',
              action: ['edit']
            },
            controller: 'UrlparamEditCtrl'
          })
          //urlparam  end
          //iamazonurl
          .state('ipushservice.iamazonurl', {
            url: '/iamazonurl',
            templateUrl: 'app/ipushservice/iamazonurl.list.html',
            data: {
              model: 'iamazonurl',
              action: ['list']
            },
            controller: 'iAmazonurlListCtrl'
          })
          .state('ipushservice.add-iamazonurl', {
            url: '/iamazonurl/add',
            templateUrl: 'app/ipushservice/iamazonurl.edit.html',
            data: {
              model: 'iamazonurl',
              action: ['add']
            },
            controller: 'iAmazonurlEditCtrl'
          })
          .state('ipushservice.edit-iamazonurl', {
            url: '/iamazonurl/:id',
            templateUrl: 'app/ipushservice/iamazonurl.edit.html',
            data: {
              model: 'iamazonurl',
              action: ['edit']
            },
            controller: 'iAmazonurlEditCtrl'
          })
          //iamazonurl  end
          //iurlitem
          .state('ipushservice.iurlitem', {
            url: '/iurlitem',
            templateUrl: 'app/ipushservice/iurlitem.list.html',
            data: {
              model: 'iurlitem',
              action: ['list']
            },
            controller: 'iUrlitemListCtrl'
          })
          .state('ipushservice.add-iurlitem', {
            url: '/iurlitem/add',
            templateUrl: 'app/ipushservice/iurlitem.edit.html',
            data: {
              model: 'iurlitem',
              action: ['add']
            },
            controller: 'iUrlitemEditCtrl'
          })
          .state('ipushservice.edit-iurlitem', {
            url: '/iurlitem/:id',
            templateUrl: 'app/ipushservice/iurlitem.edit.html',
            data: {
              model: 'iurlitem',
              action: ['edit']
            },
            controller: 'iUrlitemEditCtrl'
          })
          //iurlitem  end
          //iurlparam
          .state('ipushservice.iurlparam', {
            url: '/iurlparam',
            templateUrl: 'app/ipushservice/iurlparam.list.html',
            data: {
              model: 'iurlparam',
              action: ['list']
            },
            controller: 'iUrlparamListCtrl'
          })
          .state('ipushservice.add-iurlparam', {
            url: '/iurlparam/add',
            templateUrl: 'app/ipushservice/iurlparam.edit.html',
            data: {
              model: 'iurlparam',
              action: ['add']
            },
            controller: 'iUrlparamEditCtrl'
          })
          .state('ipushservice.edit-iurlparam', {
            url: '/iurlparam/:id',
            templateUrl: 'app/ipushservice/iurlparam.edit.html',
            data: {
              model: 'iurlparam',
              action: ['edit']
            },
            controller: 'iUrlparamEditCtrl'
          })
          //urlparam  end
          //iostrackurl start
         .state('ipushservice.iostrackurl', {
            url: '/iostrackurl',
            templateUrl: 'app/ipushservice/iostrackurl.list.html',
            data: {
              model: 'iostrackurl',
              action: ['list']
            },
            controller: 'IostrackurlListCtrl'
          })
          .state('ipushservice.add-iostrackurl', {
            url: '/iostrackurl/add',
            templateUrl: 'app/ipushservice/iostrackurl.edit.html',
            data: {
              model: 'iostrackurl',
              action: ['add']
            },
            controller: 'IostrackurlEditCtrl'
          })
          .state('ipushservice.edit-iostrackurl', {
            url: '/iostrackurl/:id',
            templateUrl: 'app/ipushservice/iostrackurl.edit.html',
            data: {
              model: 'iostrackurl',
              action: ['edit']
            },
            controller: 'IostrackurlEditCtrl'
          })
          //iostrackurl end
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
