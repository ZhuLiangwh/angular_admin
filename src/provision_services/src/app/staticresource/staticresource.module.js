define([
  './staticresource.config',
  'common/utils/registerToModule',
  './icon.list',
  './icon.edit',
  './apk.list',
  './apk.edit'
], function(staticresourceConfig, rtm, IconListCtrl, IconEditCtrl, ApkListCtrl, ApkEditCtrl) /*invoke*/ {
  var modName = 'app.resourceManagement',
    mod = angular.module(modName, []);
  rtm(IconListCtrl, IconEditCtrl , ApkListCtrl, ApkEditCtrl)(mod);
  staticresourceConfig(mod);
  return modName;
});
