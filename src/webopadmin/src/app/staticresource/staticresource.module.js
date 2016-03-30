define([
  './staticresource.config',
  'common/utils/registerToModule',
  './icon.list',
  './icon.edit',
  './atheme.list',
  './atheme.edit',
  './athemelocale.list',
  './athemelocale.edit'
], function(staticresourceConfig, rtm, IconListCtrl, IconEditCtrl, AthemeListCtrl, 
            AthemeEditCtrl, AthemelocaleListCtrl, AthemelocaleEditCtrl) /*invoke*/ {
  var modName = 'app.resourceManagement',
    mod = angular.module(modName, []);
  rtm(IconListCtrl, IconEditCtrl, AthemeListCtrl, AthemeEditCtrl, AthemelocaleListCtrl, 
       AthemelocaleEditCtrl)(mod);
  staticresourceConfig(mod);
  return modName;
});
