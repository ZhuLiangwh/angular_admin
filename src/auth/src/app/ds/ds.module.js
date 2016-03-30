define([
  './apiService',
  'common/utils/registerToModule',
  './usermanagement'
], function(apiService, rtm, usermanagement) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService ,usermanagement)(mod);

  return modName;
});
