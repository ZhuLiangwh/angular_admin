define([
  './themerecommended.config',
  'common/utils/registerToModule',
  './athemepushhome.list',
  './athemepushhome.edit'
], function(themerecommendedConfig, rtm, AthemepushhomeListCtrl,AthemepushhomeEditCtrl) /*invoke*/ {
  var modName = 'app.themerecommended',
    mod = angular.module(modName, []);
  rtm(AthemepushhomeListCtrl,AthemepushhomeEditCtrl)(mod);
  themerecommendedConfig(mod);
  return modName;
});