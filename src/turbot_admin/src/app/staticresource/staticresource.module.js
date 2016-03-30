define([
  './staticresource.config',
  'common/utils/registerToModule',
  './icon.list',
  './icon.edit'
], function(staticresourceConfig, rtm, IconListCtrl, IconEditCtrl) /*invoke*/ {
  var modName = 'app.resourceManagement',
    mod = angular.module(modName, []);
  rtm(IconListCtrl, IconEditCtrl)(mod);
  staticresourceConfig(mod);
  return modName;
});
