define([
  './apiService',
  'common/utils/registerToModule',
  './aosoperator',
  './aospackage',
  './aosruledata',
  './aossource',
  './aoslocale',
  './icon',
  './hotapp',
  './category',
  './usermanagement'
], function(apiService, rtm, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, hotapp, category,usermanagement) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, hotapp, category,usermanagement)(mod);

  return modName;
});
