define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('pcpreset', {
            abstract: true,
            url: '/pcpreset',
            template: '<ui-view/>'
          })
          .state('pcpreset.pbookmark', {
            url: '/pbookmark',
            templateUrl: 'app/pcpreset/pbookmark.list.html',
            data: {
              model: 'pbookmark',
              action: ['list']
            },
            controller: 'PCbookmarkListCtrl'
          })
          .state('pcpreset.add-pbookmark', {
            url: '/pbookmark/add',
            templateUrl: 'app/pcpreset/pbookmark.edit.html',
            data: {
              model: 'pbookmark',
              action: ['add']
            },
            controller: 'PCbookmarkEditCtrl'
          })
          .state('pcpreset.edit-pbookmark', {
            url: '/pbookmark/:id',
            templateUrl: 'app/pcpreset/pbookmark.edit.html',
            data: {
              model: 'pbookmark',
              action: ['edit']
            },
            controller: 'PCbookmarkEditCtrl'
          })
          .state('pcpreset.pbookmarkfolder', {
            url: '/pbookmarkfolder',
            templateUrl: 'app/pcpreset/pbookmarkfolder.list.html',
            data: {
              model: 'pbookmarkfolder',
              action: ['list']
            },
            controller: 'PCbookmarkfolderListCtrl'
          })
          .state('pcpreset.add-pbookmarkfolder', {
            url: '/pbookmarkfolder/add',
            templateUrl: 'app/pcpreset/pbookmarkfolder.edit.html',
            data: {
              model: 'pbookmarkfolder',
              action: ['add']
            },
            controller: 'PCbookmarkfolderEditCtrl'
          })
          .state('pcpreset.edit-pbookmarkfolder', {
            url: '/pbookmarkfolder/:id',
            templateUrl: 'app/pcpreset/pbookmarkfolder.edit.html',
            data: {
              model: 'pbookmarkfolder',
              action: ['edit']
            },
            controller: 'PCbookmarkfolderEditCtrl'
          })
          .state('pcpreset.pbookmarkpreset', {
            url: '/pbookmarkpreset',
            templateUrl: 'app/pcpreset/pbookmarkpreset.list.html',
            data: {
              model: 'pbookmarkpreset',
              action: ['list']
            },
            controller: 'PbookmarkpresetListCtrl'
          })
          .state('pcpreset.add-pbookmarkpreset', {
            url: '/pbookmarkpreset/add',
            templateUrl: 'app/pcpreset/pbookmarkpreset.edit.html',
            data: {
              model: 'pbookmarkpreset',
              action: ['add']
            },
            controller: 'PbookmarkpresetEditCtrl'
          })
          .state('pcpreset.edit-pbookmarkpreset', {
            url: '/pbookmarkpreset/:id',
            templateUrl: 'app/pcpreset/pbookmarkpreset.edit.html',
            data: {
              model: 'pbookmarkpreset',
              action: ['edit']
            },
            controller: 'PbookmarkpresetEditCtrl'
          })
          .state('pcpreset.pspeeddial', {
            url: '/pspeeddial',
            templateUrl: 'app/pcpreset/pspeeddial.list.html',
            data: {
              model: 'pspeeddial',
              action: ['list']
            },
            controller: 'PspeeddialListCtrl'
          })
          .state('pcpreset.add-pspeeddial', {
            url: '/pspeeddial/add',
            templateUrl: 'app/pcpreset/pspeeddial.edit.html',
            data: {
              model: 'pspeeddial',
              action: ['add']
            },
            controller: 'PspeeddialEditCtrl'
          })
          .state('pcpreset.edit-pspeeddial', {
            url: '/pspeeddial/:id',
            templateUrl: 'app/pcpreset/pspeeddial.edit.html',
            data: {
              model: 'pspeeddial',
              action: ['edit']
            },
            controller: 'PspeeddialEditCtrl'
          })
          .state('pcpreset.pspeeddialpreset', {
            url: '/pspeeddialpreset',
            templateUrl: 'app/pcpreset/pspeeddialpreset.list.html',
            data: {
              model: 'pspeeddialpreset',
              action: ['list']
            },
            controller: 'PspeeddialpresetListCtrl'
          })
          .state('pcpreset.add-pspeeddialpreset', {
            url: '/pspeeddialpreset/add',
            templateUrl: 'app/pcpreset/pspeeddialpreset.edit.html',
            data: {
              model: 'pspeeddialpreset',
              action: ['add']
            },
            controller: 'PspeeddialpresetEditCtrl'
          })
          .state('pcpreset.edit-pspeeddialpreset', {
            url: '/pspeeddialpreset/:id',
            templateUrl: 'app/pcpreset/pspeeddialpreset.edit.html',
            data: {
              model: 'pspeeddialpreset',
              action: ['edit']
            },
            controller: 'PspeeddialpresetEditCtrl'
          })
          .state('pcpreset.psearcher', {
            url: '/psearcher',
            templateUrl: 'app/pcpreset/psearcher.list.html',
            data: {
              model: 'psearcher',
              action: ['list']
            },
            controller: 'PsearcherListCtrl'
          })
          .state('pcpreset.add-psearcher', {
            url: '/psearcher/add',
            templateUrl: 'app/pcpreset/psearcher.edit.html',
            data: {
              model: 'psearcher',
              action: ['add']
            },
            controller: 'PsearcherEditCtrl'
          })
          .state('pcpreset.edit-psearcher', {
            url: '/psearcher/:id',
            templateUrl: 'app/pcpreset/psearcher.edit.html',
            data: {
              model: 'psearcher',
              action: ['edit']
            },
            controller: 'PsearcherEditCtrl'
          })
          .state('pcpreset.psearcherpreset', {
            url: '/psearcherpreset',
            templateUrl: 'app/pcpreset/psearcherpreset.list.html',
            data: {
              model: 'psearcherpreset',
              action: ['list']
            },
            controller: 'PsearcherpresetListCtrl'
          })
          .state('pcpreset.add-psearcherpreset', {
            url: '/psearcherpreset/add',
            templateUrl: 'app/pcpreset/psearcherpreset.edit.html',
            data: {
              model: 'psearpsearcherpresetcher',
              action: ['add']
            },
            controller: 'PsearcherpresetEditCtrl'
          })
          .state('pcpreset.edit-psearcherpreset', {
            url: '/psearcherpreset/:id',
            templateUrl: 'app/pcpreset/psearcherpreset.edit.html',
            data: {
              model: 'psearcherpreset',
              action: ['edit']
            },
            controller: 'PsearcherpresetEditCtrl'
          })
          /*add state to here*/
      }
    ]);
    return mod;
  };
});
