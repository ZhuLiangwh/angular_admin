define([
  './apiService',
  'common/utils/registerToModule',
  './aosoperator',
  './aospackage',
  './aosruledata',
  './aossource',
  './aoslocale',
  './icon',
  './theme',
  './themelocale',
  './themefolder',
  './themepush',
  './hotword',
  './usermanagement',
  './adblockerfile',
  './adblockerpush',
  './adblockerlocale'
], function(apiService, rtm, 
            aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, 
            theme, themelocale, themefolder, themepush, hotword, usermanagement,
            adblockerfile,adblockerpush,adblockerlocale) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
    rtm(apiService, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, 
      theme, themelocale,themefolder, themepush, hotword, usermanagement,adblockerfile,
      adblockerpush,adblockerlocale)(mod);

  return modName;
});