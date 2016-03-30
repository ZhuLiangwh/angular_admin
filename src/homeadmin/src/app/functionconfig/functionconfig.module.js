define([
  './functionconfig.config',
  'common/utils/registerToModule',
  './graySwitch.list',
  './graySwitch.edit',
  './white-list.list',
  './white-list.edit'
], function(functionConfig, rtm,GraySwitchListCtrl,GraySwitchEditCtrl,WhiteListCtrl,WhiteEditCtrl) /*invoke*/ {
// ], function(functionConfig, rtm,GraySwitchListCtrl,GraySwitchEditCtrl) /*invoke*/ {
  var modName = 'app.functionconfig',
    mod = angular.module(modName, []);
  rtm(GraySwitchListCtrl,GraySwitchEditCtrl,WhiteListCtrl,WhiteEditCtrl)(mod);
  // rtm(GraySwitchListCtrl,GraySwitchEditCtrl)(mod);

  functionConfig(mod);
  return modName;
});
