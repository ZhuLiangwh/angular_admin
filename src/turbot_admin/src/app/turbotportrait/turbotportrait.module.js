define([
  './turbotportrait.config',
  'common/utils/registerToModule',
  './usertag.list',
  './usertag.edit'
], function(turbotportraitConfig, rtm, UsertagListCtrl, UsertagEditCtrl) /*invoke*/ {
  var modName = 'app.turbotportrait',
    mod = angular.module(modName, []);
  rtm(UsertagListCtrl, UsertagEditCtrl)(mod);

  turbotportraitConfig(mod);
  return modName;
});


