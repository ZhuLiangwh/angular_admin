define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('aospreset', {
            abstract: true,
            url: '/aospreset',
            template: '<ui-view/>'
          })
          .state('aospreset.aosbookmark', {
            url: '/aosbookmark',
            templateUrl: 'app/aospreset/aosbookmark.list.html',
            data: {
              model: 'aosbookmark',
              action: ['list']
            },
            controller: 'AosbookmarkListCtrl'
          })
          .state('aospreset.add-aosbookmark', {
            url: '/aosbookmark/add',
            templateUrl: 'app/aospreset/aosbookmark.edit.html',
            data: {
              model: 'aosbookmark',
              action: ['add']
            },
            controller: 'AosbookmarkEditCtrl'
          })
          .state('aospreset.edit-aosbookmark', {
            url: '/aosbookmark/:id',
            templateUrl: 'app/aospreset/aosbookmark.edit.html',
            data: {
              model: 'aosbookmark',
              action: ['edit']
            },
            controller: 'AosbookmarkEditCtrl'
          })
          .state('aospreset.aosbookmarkfolder', {
            url: '/aosbookmarkfolder',
            templateUrl: 'app/aospreset/aosbookmarkfolder.list.html',
            data: {
              model: 'aosbookmarkfolder',
              action: ['list']
            },
            controller: 'AosbookmarkfolderListCtrl'
          })
          .state('aospreset.add-aosbookmarkfolder', {
            url: '/aosbookmarkfolder/add',
            templateUrl: 'app/aospreset/aosbookmarkfolder.edit.html',
            data: {
              model: 'aosbookmarkfolder',
              action: ['add']
            },
            controller: 'AosbookmarkfolderEditCtrl'
          })
          .state('aospreset.edit-aosbookmarkfolder', {
            url: '/aosbookmarkfolder/:id',
            templateUrl: 'app/aospreset/aosbookmarkfolder.edit.html',
            data: {
              model: 'aosbookmarkfolder',
              action: ['edit']
            },
            controller: 'AosbookmarkfolderEditCtrl'
          })
          .state('aospreset.aosspeeddial', {
            url: '/aosspeeddial',
            templateUrl: 'app/aospreset/aosspeeddial.list.html',
            data: {
              model: 'aosspeeddial',
              action: ['list']
            },
            controller: 'AosspeeddialListCtrl'
          })
          .state('aospreset.add-aosspeeddial', {
            url: '/aosspeeddial/add',
            templateUrl: 'app/aospreset/aosspeeddial.edit.html',
            data: {
              model: 'aosspeeddial',
              action: ['add']
            },
            controller: 'AosspeeddialEditCtrl'
          })
          .state('aospreset.edit-aosspeeddial', {
            url: '/aosspeeddial/:id',
            templateUrl: 'app/aospreset/aosspeeddial.edit.html',
            data: {
              model: 'aosspeeddial',
              action: ['edit']
            },
            controller: 'AosspeeddialEditCtrl'
          })
          .state('aospreset.aosspeeddialdesktop', {
            url: '/aosspeeddialdesktop',
            templateUrl: 'app/aospreset/aosspeeddialdesktop.list.html',
            data: {
              model: 'aosspeeddialdesktop',
              action: ['list']
            },
            controller: 'AosspeeddialdesktopListCtrl'
          })
          .state('aospreset.add-aosspeeddialdesktop', {
            url: '/aosspeeddialdesktop/add',
            templateUrl: 'app/aospreset/aosspeeddialdesktop.edit.html',
            data: {
              model: 'aosspeeddialdesktop',
              action: ['add']
            },
            controller: 'AosspeeddialdesktopEditCtrl'
          })
          .state('aospreset.edit-aosspeeddialdesktop', {
            url: '/aosspeeddialdesktop/:id',
            templateUrl: 'app/aospreset/aosspeeddialdesktop.edit.html',
            data: {
              model: 'aosspeeddialdesktop',
              action: ['edit']
            },
            controller: 'AosspeeddialdesktopEditCtrl'
          })
          .state('aospreset.aosspeeddialscreen', {
            url: '/aosspeeddialscreen',
            templateUrl: 'app/aospreset/aosspeeddialscreen.list.html',
            data: {
              model: 'aosspeeddialscreen',
              action: ['list']
            },
            controller: 'AosspeeddialscreenListCtrl'
          })
          .state('aospreset.add-aosspeeddialscreen', {
            url: '/aosspeeddialscreen/add',
            templateUrl: 'app/aospreset/aosspeeddialscreen.edit.html',
            data: {
              model: 'aosspeeddialscreen',
              action: ['add']
            },
            controller: 'AosspeeddialscreenEditCtrl'
          })
          .state('aospreset.edit-aosspeeddialscreen', {
            url: '/aosspeeddialscreen/:id',
            templateUrl: 'app/aospreset/aosspeeddialscreen.edit.html',
            data: {
              model: 'aosspeeddialscreen',
              action: ['edit']
            },
            controller: 'AosspeeddialscreenEditCtrl'
          })
          .state('aospreset.aosspeeddialfolder', {
            url: '/aosspeeddialfolder',
            templateUrl: 'app/aospreset/aosspeeddialfolder.list.html',
            data: {
              model: 'aosspeeddialfolder',
              action: ['list']
            },
            controller: 'AosspeeddialfolderListCtrl'
          })
          .state('aospreset.add-aosspeeddialfolder', {
            url: '/aosspeeddialfolder/add',
            templateUrl: 'app/aospreset/aosspeeddialfolder.edit.html',
            data: {
              model: 'aosspeeddialfolder',
              action: ['add']
            },
            controller: 'AosspeeddialfolderEditCtrl'
          })
          .state('aospreset.edit-aosspeeddialfolder', {
            url: '/aosspeeddialfolder/:id',
            templateUrl: 'app/aospreset/aosspeeddialfolder.edit.html',
            data: {
              model: 'aosspeeddialfolder',
              action: ['edit']
            },
            controller: 'AosspeeddialfolderEditCtrl'
          })
          .state('aospreset.aospredata', {
            url: '/aospredata',
            templateUrl: 'app/aospreset/aospredata.list.html',
            data: {
              model: 'aospredata',
              action: ['list']
            },
            controller: 'AospredataListCtrl'
          })
          .state('aospreset.add-aospredata', {
            url: '/aospredata/add',
            templateUrl: 'app/aospreset/aospredata.edit.html',
            data: {
              model: 'aospredata',
              action: ['add']
            },
            controller: 'AospredataEditCtrl'
          })
          .state('aospreset.edit-aospredata', {
            url: '/aospredata/:id',
            templateUrl: 'app/aospreset/aospredata.edit.html',
            data: {
              model: 'aospredata',
              action: ['edit']
            },
            controller: 'AospredataEditCtrl'
          })
          .state('aospreset.aosgesture', {
            url: '/aosgesture',
            templateUrl: 'app/aospreset/aosgesture.list.html',
            data: {
              model: 'aosgesture',
              action: ['list']
            },
            controller: 'AosgestureListCtrl'
          })
          .state('aospreset.add-aosgesture', {
            url: '/aosgesture/add',
            templateUrl: 'app/aospreset/aosgesture.edit.html',
            data: {
              model: 'aosgesture',
              action: ['add']
            },
            controller: 'AosgestureEditCtrl'
          })
          .state('aospreset.edit-aosgesture', {
            url: '/aosgesture/:id',
            templateUrl: 'app/aospreset/aosgesture.edit.html',
            data: {
              model: 'aosgesture',
              action: ['edit']
            },
            controller: 'AosgestureEditCtrl'
          })
          .state('aospreset.aosstrategy', {
            url: '/aosstrategy',
            templateUrl: 'app/aospreset/aosstrategy.list.html',
            data: {
              model: 'aosstrategy',
              action: ['list']
            },
            controller: 'AosstrategyListCtrl'
          })
          .state('aospreset.add-aosstrategy', {
            url: '/aosstrategy/add',
            templateUrl: 'app/aospreset/aosstrategy.edit.html',
            data: {
              model: 'aosstrategy',
              action: ['add']
            },
            controller: 'AosstrategyEditCtrl'
          })
          .state('aospreset.edit-aosstrategy', {
            url: '/aosstrategy/:id',
            templateUrl: 'app/aospreset/aosstrategy.edit.html',
            data: {
              model: 'aosstrategy',
              action: ['edit']
            },
            controller: 'AosstrategyEditCtrl'
          })
          .state('aospreset.aossearcherfolder', {
            url: '/aossearcherfolder',
            templateUrl: 'app/aospreset/aossearcherfolder.list.html',
            data: {
              model: 'aossearcherfolder',
              action: ['list']
            },
            controller: 'AossearcherfolderListCtrl'
          })
          .state('aospreset.add-aossearcherfolder', {
            url: '/aossearcherfolder/add',
            templateUrl: 'app/aospreset/aossearcherfolder.edit.html',
            data: {
              model: 'aossearcherfolder',
              action: ['add']
            },
            controller: 'AossearcherfolderEditCtrl'
          })
          .state('aospreset.edit-aossearcherfolder', {
            url: '/aossearcherfolder/:id',
            templateUrl: 'app/aospreset/aossearcherfolder.edit.html',
            data: {
              model: 'aossearcherfolder',
              action: ['edit']
            },
            controller: 'AossearcherfolderEditCtrl'
          })
          .state('aospreset.aossearcher', {
            url: '/aossearcher',
            templateUrl: 'app/aospreset/aossearcher.list.html',
            data: {
              model: 'aossearcher',
              action: ['list']
            },
            controller: 'AossearcherListCtrl'
          })
          .state('aospreset.add-aossearcher', {
            url: '/aossearcher/add',
            templateUrl: 'app/aospreset/aossearcher.edit.html',
            data: {
              model: 'aossearcher',
              action: ['add']
            },
            controller: 'AossearcherEditCtrl'
          })
          .state('aospreset.edit-aossearcher', {
            url: '/aossearcher/:id',
            templateUrl: 'app/aospreset/aossearcher.edit.html',
            data: {
              model: 'aossearcher',
              action: ['edit']
            },
            controller: 'AossearcherEditCtrl'
          })
          .state('aospreset.aossharecontent', {
            url: '/aossharecontent',
            templateUrl: 'app/aospreset/aossharecontent.list.html',
            data: {
              model: 'aossharecontent',
              action: ['list']
            },
            controller: 'AossharecontentListCtrl'
          })
          .state('aospreset.add-aossharecontent', {
            url: '/aossharecontent/add',
            templateUrl: 'app/aospreset/aossharecontent.edit.html',
            data: {
              model: 'aossharecontent',
              action: ['add']
            },
            controller: 'AossharecontentEditCtrl'
          })
          .state('aospreset.edit-aossharecontent', {
            url: '/aossharecontent/:id',
            templateUrl: 'app/aospreset/aossharecontent.edit.html',
            data: {
              model: 'aossharecontent',
              action: ['edit']
            },
            controller: 'AossharecontentEditCtrl'
          })
          .state('aospreset.aostemplateshare', {
            url: '/aostemplateshare',
            templateUrl: 'app/aospreset/aostemplateshare.list.html',
            data: {
              model: 'aostemplateshare',
              action: ['list']
            },
            controller: 'AostemplateshareListCtrl'
          })
          .state('aospreset.add-aostemplateshare', {
            url: '/aostemplateshare/add',
            templateUrl: 'app/aospreset/aostemplateshare.edit.html',
            data: {
              model: 'aostemplateshare',
              action: ['add']
            },
            controller: 'AostemplateshareEditCtrl'
          })
          .state('aospreset.edit-aostemplateshare', {
            url: '/aostemplateshare/:id',
            templateUrl: 'app/aospreset/aostemplateshare.edit.html',
            data: {
              model: 'aostemplateshare',
              action: ['edit']
            },
            controller: 'AostemplateshareEditCtrl'
          })
          .state('aospreset.aosrecommendshare', {
            url: '/aosrecommendshare',
            templateUrl: 'app/aospreset/aosrecommendshare.list.html',
            data: {
              model: 'aosrecommendshare',
              action: ['list']
            },
            controller: 'AosrecommendshareListCtrl'
          })
          .state('aospreset.add-aosrecommendshare', {
            url: '/aosrecommendshare/add',
            templateUrl: 'app/aospreset/aosrecommendshare.edit.html',
            data: {
              model: 'aosrecommendshare',
              action: ['add']
            },
            controller: 'AosrecommendshareEditCtrl'
          })
          .state('aospreset.edit-aosrecommendshare', {
            url: '/aosrecommendshare/:id',
            templateUrl: 'app/aospreset/aosrecommendshare.edit.html',
            data: {
              model: 'aosrecommendshare',
              action: ['edit']
            },
            controller: 'AosrecommendshareEditCtrl'
          })
          .state('aospreset.exportpreset', {
              url: '/exportpreset',
              templateUrl: 'app/aospreset/exportpreset.html',
              data: {
                model: 'exportpreset',
                action: []
              },
              controller: 'AosexportpresetCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
