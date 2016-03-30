define([
  './webads.config',
  'common/utils/registerToModule',
  './applist.list',
  './applist.edit',
  './appads.list',
  './appads.edit'
], function(webadsConfig, rtm, ApplistListCtrl,ApplistEditCtrl,AppadsListCtrl,AppadsEditCtrl) /*invoke*/ {
  var modName = 'app.webads',
    mod = angular.module(modName, []);
  rtm(ApplistListCtrl,ApplistEditCtrl,AppadsListCtrl,AppadsEditCtrl)(mod);
  webadsConfig(mod);
  return modName;
});