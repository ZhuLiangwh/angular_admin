define([
  './apiService',
  'common/utils/registerToModule',
  './layouts'
], function(apiService, rtm,layouts) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService,layouts)(mod);

  return modName;
});
