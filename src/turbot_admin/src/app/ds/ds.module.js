define([
  './apiService',
  'common/utils/registerToModule',
  './aosoperator',
  './aospackage',
  './aosruledata',
  './aossource',
  './aoslocale',
  './icon',
  './usermanagement',
  './ad',
  './adpos',
  './adpush',
  './adsource',
  './adgroup',
  './adpostat',
  './adsrcstat',
  './usertag',
  './adstatistics'
], function(apiService, rtm, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, usermanagement, ad, adpos, adpush, adsource,adgroup,adpostat,adsrcstat,usertag,adstatistics) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, usermanagement, ad, adpos, adpush, adsource,adgroup,adpostat,adsrcstat,usertag,adstatistics)(mod);

  return modName;
});