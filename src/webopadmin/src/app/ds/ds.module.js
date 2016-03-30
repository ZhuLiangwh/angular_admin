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
  './themesubject',
  './themecategory',
  './webapp',
  './webappsubject',
  './webappcategory',
  './webapprecommend',
  './usermanagement',
  './atheme',
  './athemelocale',
  './athemefeatured',
  './athemecategory',
  './athemepushstore',
  './athemepushhome',
  './applist',
  './appads'
], function(apiService, rtm, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, theme,
 themesubject, themecategory,webapp,webappsubject,webappcategory,webapprecommend, usermanagement,atheme,
 athemelocale,athemefeatured,athemecategory,athemepushstore,athemepushhome,applist,appads) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, theme, themesubject, 
    themecategory,webapp,webappsubject,webappcategory,webapprecommend, usermanagement,atheme,athemelocale,
    athemefeatured,athemecategory,athemepushstore,athemepushhome,applist,appads)(mod);

  return modName;
});
