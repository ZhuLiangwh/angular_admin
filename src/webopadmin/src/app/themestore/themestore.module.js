define([
  './themestore.config',
  'common/utils/registerToModule',
  './theme.list',
  './theme.edit',
  './themesubject.list',
  './themesubject.edit',
  './themecategory.list',
  './themecategory.edit'
], function(themestoreConfig, rtm, ThemeListCtrl,ThemeEditCtrl,ThemesubjectListCtrl,ThemesubjectEditCtrl,ThemecategoryListCtrl,ThemecategoryEditCtrl) /*invoke*/ {
  var modName = 'app.themestore',
    mod = angular.module(modName, []);
  rtm(ThemeListCtrl,ThemeEditCtrl,ThemesubjectListCtrl,ThemesubjectEditCtrl,ThemecategoryListCtrl,ThemecategoryEditCtrl)(mod);
  themestoreConfig(mod);
  return modName;
});
