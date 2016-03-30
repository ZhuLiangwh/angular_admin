define([
  './aospreset.config',
  'common/utils/registerToModule',
  './aosbookmark.list',
  './aosbookmark.edit',
  './aosbookmarkfolder.list',
  './aosbookmarkfolder.edit',
  './aosspeeddial.list',
  './aosspeeddial.edit',
  './aosspeeddialdesktop.list',
  './aosspeeddialdesktop.edit',
  './aosspeeddialscreen.list',
  './aosspeeddialscreen.edit',
  './aosspeeddialfolder.list',
  './aosspeeddialfolder.edit',
  './aospredata.list',
  './aospredata.edit',
  './aosgesture.list',
  './aosgesture.edit',
  './aosstrategy.list',
  './aosstrategy.edit',
  './aossearcherfolder.list',
  './aossearcherfolder.edit',
  './aossearcher.list',
  './aossearcher.edit',
  './aossharecontent.list',
  './aossharecontent.edit',
  './aostemplateshare.list',
  './aostemplateshare.edit',
  './aosrecommendshare.list',
  './aosrecommendshare.edit',
  './exportpreset'
], function(aospresetConfig, rtm, AosbookmarkListCtrl, AosbookmarkEditCtrl, AosbookmarkfolderListCtrl, AosbookmarkfolderEditCtrl, AosspeeddialListCtrl, AosspeeddialEditCtrl, AosspeeddialdesktopListCtrl, AosspeeddialdesktopEditCtrl, AosspeeddialscreenListCtrl, AosspeeddialscreenEditCtrl, AosspeeddialfolderListCtrl, AosspeeddialfolderEditCtrl, AospredataListCtrl, AospredataEditCtrl, AosgestureListCtrl, AosgestureEditCtrl, AosstrategyListCtrl, AosstrategyEditCtrl,AossearcherfolderListCtrl, AossearcherfolderEditCtrl, AossearcherListCtrl, AossearcherEditCtrl, AossharecontentListCtrl, AossharecontentEditCtrl, AostemplateshareListCtrl, AostemplateshareEditCtrl, AosrecommendshareListCtrl, AosrecommendshareEditCtrl,exportpreset) /*invoke*/ {
  var modName = 'app.aospreset',
    mod = angular.module(modName, []);
  rtm(AosbookmarkListCtrl, AosbookmarkEditCtrl, AosbookmarkfolderListCtrl, AosbookmarkfolderEditCtrl, AosspeeddialListCtrl, AosspeeddialEditCtrl, AosspeeddialdesktopListCtrl, AosspeeddialdesktopEditCtrl, AosspeeddialscreenListCtrl, AosspeeddialscreenEditCtrl, AosspeeddialfolderListCtrl, AosspeeddialfolderEditCtrl, AospredataListCtrl, AospredataEditCtrl, AosgestureListCtrl, AosgestureEditCtrl, AosstrategyListCtrl, AosstrategyEditCtrl,AossearcherfolderListCtrl, AossearcherfolderEditCtrl, AossearcherListCtrl, AossearcherEditCtrl, AossharecontentListCtrl, AossharecontentEditCtrl, AostemplateshareListCtrl, AostemplateshareEditCtrl, AosrecommendshareListCtrl, AosrecommendshareEditCtrl,exportpreset)(mod);


  aospresetConfig(mod);
  return modName;
});
