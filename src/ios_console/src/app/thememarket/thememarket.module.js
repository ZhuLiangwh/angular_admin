define([
  './thememarket.config',
  'common/utils/registerToModule',
  './theme.list',
  './theme.edit',
  './themelocale.list',
  './themelocale.edit',
  './themefolder.list',
  './themefolder.edit',
  './themepush.list',
  './themepush.edit'
], function(thememarketConfig, rtm, ThemeListCtrl,ThemeEditCtrl,ThemelocaleListCtrl,ThemelocaleEditCtrl,ThemefolderListCtrl,ThemefolderEditCtrl,ThemepushListCtrl,ThemepushEditCtrl) /*invoke*/ {
  var modName = 'app.thememarket',
    mod = angular.module(modName, []);
  rtm(ThemeListCtrl,ThemeEditCtrl,ThemelocaleListCtrl,ThemelocaleEditCtrl,ThemefolderListCtrl,ThemefolderEditCtrl,ThemepushListCtrl,ThemepushEditCtrl)(mod);
  thememarketConfig(mod);
  return modName;
});
