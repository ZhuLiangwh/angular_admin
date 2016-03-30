define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('pushservice', {
            abstract: true,
            url: '/pushservice',
            template: '<ui-view/>'
          })
          .state('pushservice.bookmarkpush', {
            url: '/bookmarkpush',
            templateUrl: 'app/pushservice/bookmarkpush.list.html',
            data: {
              model: 'bookmarkpush',
              action: ['list']
            },
            controller: 'BookmarkpushListCtrl'
          })
          .state('pushservice.add-bookmarkpush', {
            url: '/bookmarkpush/add',
            templateUrl: 'app/pushservice/bookmarkpush.edit.html',
            data: {
              model: 'bookmarkpush',
              action: ['add']
            },
            controller: 'BookmarkpushEditCtrl'
          })
          .state('pushservice.edit-bookmarkpush', {
            url: '/bookmarkpush/:id',
            templateUrl: 'app/pushservice/bookmarkpush.edit.html',
            data: {
              model: 'bookmarkpush',
              action: ['edit']
            },
            controller: 'BookmarkpushEditCtrl'
          })
          .state('pushservice.bookmarkfolder', {
            url: '/bookmarkfolder',
            templateUrl: 'app/pushservice/bookmarkfolder.list.html',
            data: {
              model: 'bookmarkfolder',
              action: ['list']
            },
            controller: 'BookmarkfolderListCtrl'
          })
          .state('pushservice.add-bookmarkfolder', {
            url: '/bookmarkfolder/add',
            templateUrl: 'app/pushservice/bookmarkfolder.edit.html',
            data: {
              model: 'bookmarkfolder',
              action: ['add']
            },
            controller: 'BookmarkfolderEditCtrl'
          })
          .state('pushservice.edit-bookmarkfolder', {
            url: '/bookmarkfolder/:id',
            templateUrl: 'app/pushservice/bookmarkfolder.edit.html',
            data: {
              model: 'bookmarkfolder',
              action: ['edit']
            },
            controller: 'BookmarkfolderEditCtrl'
          })
          .state('pushservice.bookmark', {
            url: '/bookmark',
            templateUrl: 'app/pushservice/bookmark.list.html',
            data: {
              model: 'bookmark',
              action: ['list']
            },
            controller: 'BookmarkListCtrl'
          })
          .state('pushservice.add-bookmark', {
            url: '/bookmark/add',
            templateUrl: 'app/pushservice/bookmark.edit.html',
            data: {
              model: 'bookmark',
              action: ['add']
            },
            controller: 'BookmarkEditCtrl'
          })
          .state('pushservice.edit-bookmark', {
            url: '/bookmark/:id',
            templateUrl: 'app/pushservice/bookmark.edit.html',
            data: {
              model: 'bookmark',
              action: ['edit']
            },
            controller: 'BookmarkEditCtrl'
          })
          .state('pushservice.speeddial', {
            url: '/speeddial',
            templateUrl: 'app/pushservice/speeddial.list.html',
            data: {
              model: 'speeddial',
              action: ['list']
            },
            controller: 'SpeeddialListCtrl'
          })
          .state('pushservice.add-speeddial', {
            url: '/speeddial/add',
            templateUrl: 'app/pushservice/speeddial.edit.html',
            data: {
              model: 'speeddial',
              action: ['add']
            },
            controller: 'SpeeddialEditCtrl'
          })
          .state('pushservice.edit-speeddial', {
            url: '/speeddial/:id',
            templateUrl: 'app/pushservice/speeddial.edit.html',
            data: {
              model: 'speeddial',
              action: ['edit']
            },
            controller: 'SpeeddialEditCtrl'
          })
          .state('pushservice.speeddialfolder', {
            url: '/speeddialfolder',
            templateUrl: 'app/pushservice/speeddialfolder.list.html',
            data: {
              model: 'speeddialfolder',
              action: ['list']
            },
            controller: 'SpeeddialfolderListCtrl'
          })
          .state('pushservice.add-speeddialfolder', {
            url: '/speeddialfolder/add',
            templateUrl: 'app/pushservice/speeddialfolder.edit.html',
            data: {
              model: 'speeddialfolder',
              action: ['add']
            },
            controller: 'SpeeddialfolderEditCtrl'
          })
          .state('pushservice.edit-speeddialfolder', {
            url: '/speeddialfolder/:id',
            templateUrl: 'app/pushservice/speeddialfolder.edit.html',
            data: {
              model: 'speeddialfolder',
              action: ['edit']
            },
            controller: 'SpeeddialfolderEditCtrl'
          })
          .state('pushservice.speeddialpush', {
            url: '/speeddialpush',
            templateUrl: 'app/pushservice/speeddialpush.list.html',
            data: {
              model: 'speeddialpush',
              action: ['list']
            },
            controller: 'SpeeddialpushListCtrl'
          })
          .state('pushservice.add-speeddialpush', {
            url: '/speeddialpush/add',
            templateUrl: 'app/pushservice/speeddialpush.edit.html',
            data: {
              model: 'speeddialpush',
              action: ['add']
            },
            controller: 'SpeeddialpushEditCtrl'
          })
          .state('pushservice.edit-speeddialpush', {
            url: '/speeddialpush/:id',
            templateUrl: 'app/pushservice/speeddialpush.edit.html',
            data: {
              model: 'speeddialpush',
              action: ['edit']
            },
            controller: 'SpeeddialpushEditCtrl'
          })
          .state('pushservice.searcher', {
            url: '/searcher',
            templateUrl: 'app/pushservice/searcher.list.html',
            data: {
              model: 'searcher',
              action: ['list']
            },
            controller: 'SearcherListCtrl'
          })
          .state('pushservice.add-searcher', {
            url: '/searcher/add',
            templateUrl: 'app/pushservice/searcher.edit.html',
            data: {
              model: 'searcher',
              action: ['add']
            },
            controller: 'SearcherEditCtrl'
          })
          .state('pushservice.edit-searcher', {
            url: '/searcher/:id',
            templateUrl: 'app/pushservice/searcher.edit.html',
            data: {
              model: 'searcher',
              action: ['edit']
            },
            controller: 'SearcherEditCtrl'
          })
          .state('pushservice.searcherpush', {
            url: '/searcherpush',
            templateUrl: 'app/pushservice/searcherpush.list.html',
            data: {
              model: 'searcherpush',
              action: ['list']
            },
            controller: 'SearcherpushListCtrl'
          })
          .state('pushservice.add-searcherpush', {
            url: '/searcherpush/add',
            templateUrl: 'app/pushservice/searcherpush.edit.html',
            data: {
              model: 'searcherpush',
              action: ['add']
            },
            controller: 'SearcherpushEditCtrl'
          })
          .state('pushservice.edit-searcherpush', {
            url: '/searcherpush/:id',
            templateUrl: 'app/pushservice/searcherpush.edit.html',
            data: {
              model: 'searcherpush',
              action: ['edit']
            },
            controller: 'SearcherpushEditCtrl'
          })
          .state('pushservice.enginestatus', {
            url: '/enginestatus',
            templateUrl: 'app/pushservice/enginestatus.list.html',
            data: {
              model: 'enginestatus',
              action: ['list']
            },
            controller: 'EnginestatusListCtrl'
          })
          .state('pushservice.add-enginestatus', {
            url: '/enginestatus/add',
            templateUrl: 'app/pushservice/enginestatus.edit.html',
            data: {
              model: 'enginestatus',
              action: ['add']
            },
            controller: 'EnginestatusEditCtrl'
          })
          .state('pushservice.edit-enginestatus', {
            url: '/enginestatus/:id',
            templateUrl: 'app/pushservice/enginestatus.edit.html',
            data: {
              model: 'enginestatus',
              action: ['edit']
            },
            controller: 'EnginestatusEditCtrl'
          })
          .state('pushservice.engineswitch', {
            url: '/engineswitch',
            templateUrl: 'app/pushservice/engineswitch.list.html',
            data: {
              model: 'engineswitch',
              action: ['list']
            },
            controller: 'EngineswitchListCtrl'
          })
          .state('pushservice.add-engineswitch', {
            url: '/engineswitch/add',
            templateUrl: 'app/pushservice/engineswitch.edit.html',
            data: {
              model: 'engineswitch',
              action: ['add']
            },
            controller: 'EngineswitchEditCtrl'
          })
          .state('pushservice.edit-engineswitch', {
            url: '/engineswitch/:id',
            templateUrl: 'app/pushservice/engineswitch.edit.html',
            data: {
              model: 'engineswitch',
              action: ['edit']
            },
            controller: 'EngineswitchEditCtrl'
          })
          .state('pushservice.trafficclean', {
            url: '/trafficclean',
            templateUrl: 'app/pushservice/trafficclean.list.html',
            data: {
              model: 'trafficclean',
              action: ['list']
            },
            controller: 'TrafficcleanListCtrl'
          })
          .state('pushservice.add-trafficclean', {
            url: '/trafficclean/add',
            templateUrl: 'app/pushservice/trafficclean.edit.html',
            data: {
              model: 'trafficclean',
              action: ['add']
            },
            controller: 'TrafficcleanEditCtrl'
          })
          .state('pushservice.edit-trafficclean', {
            url: '/trafficclean/:id',
            templateUrl: 'app/pushservice/trafficclean.edit.html',
            data: {
              model: 'trafficclean',
              action: ['edit']
            },
            controller: 'TrafficcleanEditCtrl'
          })
          .state('pushservice.notification', {
            url: '/notification',
            templateUrl: 'app/pushservice/notification.list.html',
            data: {
              model: 'notification',
              action: ['list']
            },
            controller: 'NotificationListCtrl'
          })
          .state('pushservice.add-notification', {
            url: '/notification/add',
            templateUrl: 'app/pushservice/notification.edit.html',
            data: {
              model: 'notification',
              action: ['add']
            },
            controller: 'NotificationEditCtrl'
          })
          .state('pushservice.edit-notification', {
            url: '/notification/:id',
            templateUrl: 'app/pushservice/notification.edit.html',
            data: {
              model: 'notification',
              action: ['edit']
            },
            controller: 'NotificationEditCtrl'
          })
          .state('pushservice.infocollect', {
            url: '/infocollect',
            templateUrl: 'app/pushservice/infocollect.list.html',
            data: {
              model: 'infocollect',
              action: ['list']
            },
            controller: 'InfocollectListCtrl'
          })
          .state('pushservice.add-infocollect', {
            url: '/infocollect/add',
            templateUrl: 'app/pushservice/infocollect.edit.html',
            data: {
              model: 'infocollect',
              action: ['add']
            },
            controller: 'InfocollectEditCtrl'
          })
          .state('pushservice.edit-infocollect', {
            url: '/infocollect/:id',
            templateUrl: 'app/pushservice/infocollect.edit.html',
            data: {
              model: 'infocollect',
              action: ['edit']
            },
            controller: 'InfocollectEditCtrl'
          })
          .state('pushservice.detectmodule', {
            url: '/detectmodule',
            templateUrl: 'app/pushservice/detectmodule.list.html',
            data: {
              model: 'detectmodule',
              action: ['list']
            },
            controller: 'DetectmoduleListCtrl'
          })
          .state('pushservice.add-detectmodule', {
            url: '/detectmodule/add',
            templateUrl: 'app/pushservice/detectmodule.edit.html',
            data: {
              model: 'detectmodule',
              action: ['add']
            },
            controller: 'DetectmoduleEditCtrl'
          })
          .state('pushservice.edit-detectmodule', {
            url: '/detectmodule/:id',
            templateUrl: 'app/pushservice/detectmodule.edit.html',
            data: {
              model: 'detectmodule',
              action: ['edit']
            },
            controller: 'DetectmoduleEditCtrl'
          })
          .state('pushservice.trackurl', {
            url: '/trackurl',
            templateUrl: 'app/pushservice/trackurl.list.html',
            data: {
              model: 'trackurl',
              action: ['list']
            },
            controller: 'TrackurlListCtrl'
          })
          .state('pushservice.add-trackurl', {
            url: '/trackurl/add',
            templateUrl: 'app/pushservice/trackurl.edit.html',
            data: {
              model: 'trackurl',
              action: ['add']
            },
            controller: 'TrackurlEditCtrl'
          })
          .state('pushservice.edit-trackurl', {
            url: '/trackurl/:id',
            templateUrl: 'app/pushservice/trackurl.edit.html',
            data: {
              model: 'trackurl',
              action: ['edit']
            },
            controller: 'TrackurlEditCtrl'
          })
          .state('pushservice.amazonurl', {
            url: '/amazonurl',
            templateUrl: 'app/pushservice/amazonurl.list.html',
            data: {
              model: 'amazonurl',
              action: ['list']
            },
            controller: 'AmazonurlListCtrl'
          })
          .state('pushservice.add-amazonurl', {
            url: '/amazonurl/add',
            templateUrl: 'app/pushservice/amazonurl.edit.html',
            data: {
              model: 'amazonurl',
              action: ['add']
            },
            controller: 'AmazonurlEditCtrl'
          })
          .state('pushservice.edit-amazonurl', {
            url: '/amazonurl/:id',
            templateUrl: 'app/pushservice/amazonurl.edit.html',
            data: {
              model: 'amazonurl',
              action: ['edit']
            },
            controller: 'AmazonurlEditCtrl'
          })
          .state('pushservice.urlitem', {
            url: '/urlitem',
            templateUrl: 'app/pushservice/urlitem.list.html',
            data: {
              model: 'urlitem',
              action: ['list']
            },
            controller: 'UrlitemListCtrl'
          })
          .state('pushservice.add-urlitem', {
            url: '/urlitem/add',
            templateUrl: 'app/pushservice/urlitem.edit.html',
            data: {
              model: 'urlitem',
              action: ['add']
            },
            controller: 'UrlitemEditCtrl'
          })
          .state('pushservice.edit-urlitem', {
            url: '/urlitem/:id',
            templateUrl: 'app/pushservice/urlitem.edit.html',
            data: {
              model: 'urlitem',
              action: ['edit']
            },
            controller: 'UrlitemEditCtrl'
          })
          .state('pushservice.urlparam', {
            url: '/urlparam',
            templateUrl: 'app/pushservice/urlparam.list.html',
            data: {
              model: 'urlparam',
              action: ['list']
            },
            controller: 'UrlparamListCtrl'
          })
          .state('pushservice.add-urlparam', {
            url: '/urlparam/add',
            templateUrl: 'app/pushservice/urlparam.edit.html',
            data: {
              model: 'urlparam',
              action: ['add']
            },
            controller: 'UrlparamEditCtrl'
          })
          .state('pushservice.edit-urlparam', {
            url: '/urlparam/:id',
            templateUrl: 'app/pushservice/urlparam.edit.html',
            data: {
              model: 'urlparam',
              action: ['edit']
            },
            controller: 'UrlparamEditCtrl'
          })
        /*add state to here*/
        //userExperienceSwitch start
          .state('pushservice.userExperienceSwitch', {
            url: '/userExperienceSwitch',
            templateUrl: 'app/pushservice/userExperienceSwitch.list.html',
            data: {
              model: 'userExperienceSwitch',
              action: ['list']
            },
            controller: 'UserExperienceSwitchListCtrl'
          })
          .state('pushservice.add-userExperienceSwitch', {
            url: '/userExperienceSwitch/add',
            templateUrl: 'app/pushservice/userExperienceSwitch.edit.html',
            data: {
              model: 'userExperienceSwitch',
              action: ['add']
            },
            controller: 'UserExperienceSwitchEditCtrl'
          })
          .state('pushservice.edit-userExperienceSwitch', {
            url: '/userExperienceSwitch/:id',
            templateUrl: 'app/pushservice/userExperienceSwitch.edit.html',
            data: {
              model: 'userExperienceSwitch',
              action: ['edit']
            },
            controller: 'UserExperienceSwitchEditCtrl'
          })
          //userExperienceSwitch end
          //urlredirect start
          .state('pushservice.urlredirect', {
            url: '/urlredirect',
            templateUrl: 'app/pushservice/urlredirect.list.html',
            data: {
              model: 'urlredirect',
              action: ['list']
            },
            controller: 'UrlredirectListCtrl'
          })
          .state('pushservice.add-urlredirect', {
            url: '/urlredirect/add',
            templateUrl: 'app/pushservice/urlredirect.edit.html',
            data: {
              model: 'urlredirect',
              action: ['add']
            },
            controller: 'UrlredirectEditCtrl'
          })
          .state('pushservice.edit-urlredirect', {
            url: '/urlredirect/:id',
            templateUrl: 'app/pushservice/urlredirect.edit.html',
            data: {
              model: 'urlredirect',
              action: ['edit']
            },
            controller: 'UrlredirectEditCtrl'
          })
          //urlredirect end
          .state('pushservice.addonitems', {
            url: '/addonitems',
            templateUrl: 'app/pushservice/addonitems.list.html',
            data: {
              model: 'addonitems',
              action: ['list']
            },
            controller: 'AddonitemsListCtrl'
          })
          .state('pushservice.add-addonitems', {
            url: '/addonitems/add',
            templateUrl: 'app/pushservice/addonitems.edit.html',
            data: {
              model: 'addonitems',
              action: ['add']
            },
            controller: 'AddonitemsEditCtrl'
          })
          .state('pushservice.edit-addonitems', {
            url: '/addonitems/:id',
            templateUrl: 'app/pushservice/addonitems.edit.html',
            data: {
              model: 'addonitems',
              action: ['edit']
            },
            controller: 'AddonitemsEditCtrl'
          })
          .state('pushservice.addonpopularize', {
            url: '/addonpopularize',
            templateUrl: 'app/pushservice/addonpopularize.list.html',
            data: {
              model: 'addonpopularize',
              action: ['list']
            },
            controller: 'AddonpopularizeListCtrl'
          })
          .state('pushservice.add-addonpopularize', {
            url: '/addonpopularize/add',
            templateUrl: 'app/pushservice/addonpopularize.edit.html',
            data: {
              model: 'addonpopularize',
              action: ['add']
            },
            controller: 'AddonpopularizeEditCtrl'
          })
          .state('pushservice.edit-addonpopularize', {
            url: '/addonpopularize/:id',
            templateUrl: 'app/pushservice/addonpopularize.edit.html',
            data: {
              model: 'addonpopularize',
              action: ['edit']
            },
            controller: 'AddonpopularizeEditCtrl'
          })
          .state('pushservice.addonmessage', {
            url: '/addonmessage',
            templateUrl: 'app/pushservice/addonmessage.list.html',
            data: {
              model: 'addonmessage',
              action: ['list']
            },
            controller: 'AddonmessageListCtrl'
          })
          .state('pushservice.add-addonmessage', {
            url: '/addonmessage/add',
            templateUrl: 'app/pushservice/addonmessage.edit.html',
            data: {
              model: 'addonmessage',
              action: ['add']
            },
            controller: 'AddonmessageEditCtrl'
          })
          .state('pushservice.edit-addonmessage', {
            url: '/addonmessage/:id',
            templateUrl: 'app/pushservice/addonmessage.edit.html',
            data: {
              model: 'addonmessage',
              action: ['edit']
            },
            controller: 'AddonmessageEditCtrl'
          })
          .state('pushservice.rateus', {
            url: '/rateus',
            templateUrl: 'app/pushservice/rateus.list.html',
            data: {
              model: 'rateus',
              action: ['list']
            },
            controller: 'RateusListCtrl'
          })
          .state('pushservice.add-rateus', {
            url: '/rateus/add',
            templateUrl: 'app/pushservice/rateus.edit.html',
            data: {
              model: 'rateus',
              action: ['add']
            },
            controller: 'RateusEditCtrl'
          })
          .state('pushservice.edit-rateus', {
            url: '/rateus/:id',
            templateUrl: 'app/pushservice/rateus.edit.html',
            data: {
              model: 'rateus',
              action: ['edit']
            },
            controller: 'RateusEditCtrl'
          })
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
