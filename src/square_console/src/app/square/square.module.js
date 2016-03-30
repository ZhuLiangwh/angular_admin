define([
  './square.config',
  'common/utils/registerToModule',
  './category.list',
  './category.edit',
   './hotapp.list',
  './hotapp.edit'
], function(squareConfig, rtm, CategoryListCtrl, CategoryEditCtrl, HotappListCtrl, HotappEditCtrl) /*invoke*/ {
  var modName = 'app.square',
    mod = angular.module(modName, []);
  rtm(CategoryListCtrl, CategoryEditCtrl,  HotappListCtrl, HotappEditCtrl)(mod);


  squareConfig(mod);
  return modName;
});
