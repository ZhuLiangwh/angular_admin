define([
  './pcpushservice.config',
  'common/utils/registerToModule',
  './pcbookmark.list',
  './pcbookmark.edit',
  './pcbookmarkpush.list',
  './pcbookmarkpush.edit'
], function(pcpushserviceConfig, rtm, pcBookmarkListCtrl,pcBookmarkEditCtrl,pcBookmarkpushListCtrl,pcBookmarkpushEditCtrl) /*invoke*/ {
  var modName = 'app.pcpushservice',
    mod = angular.module(modName, []);
  rtm(pcBookmarkListCtrl,pcBookmarkEditCtrl,pcBookmarkpushListCtrl,pcBookmarkpushEditCtrl)(mod);

  pcpushserviceConfig(mod);
  return modName;
});
