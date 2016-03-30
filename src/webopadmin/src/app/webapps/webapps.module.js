define([
  './webapps.config',
  'common/utils/registerToModule',
  './webapp.list',
  './webapp.edit',
  './webappsubject.list',
  './webappsubject.edit',
  './webappcategory.list',
  './webappcategory.edit',
  './webapprecommend.list',
  './webapprecommend.edit',
], function(webappsConfig, rtm, WebappListCtrl,WebappEditCtrl,WebappsubjectListCtrl,WebappsubjectEditCtrl,WebappcategoryListCtrl,WebappcategoryEditCtrl,WebapprecommendListCtrl,WebapprecommendEditCtrl) /*invoke*/ {
  var modName = 'app.webapps',
    mod = angular.module(modName, []);
  rtm(WebappListCtrl,WebappEditCtrl,WebappsubjectListCtrl,WebappsubjectEditCtrl,WebappcategoryListCtrl,WebappcategoryEditCtrl,WebapprecommendListCtrl,WebapprecommendEditCtrl)(mod);
  webappsConfig(mod);
  return modName;
});
