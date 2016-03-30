define([
  './newthemestore.config',
  'common/utils/registerToModule',
  './athemefeatured.list',
  './athemefeatured.edit',
  './athemecategory.list',
  './athemecategory.edit',
  './athemepushstore.list',
  './athemepushstore.edit'
], function(newthemestoreConfig, rtm, AthemefeaturedListCtrl,AthemefeaturedEditCtrl,AthemecategoryListCtrl,
  AthemecategoryEditCtrl,AthemepushstoreListCtrl,AthemepushstoreEditCtrl) /*invoke*/ {
  var modName = 'app.newthemestore',
    mod = angular.module(modName, []);
  rtm(AthemefeaturedListCtrl,AthemefeaturedEditCtrl,AthemecategoryListCtrl,AthemecategoryEditCtrl,
    AthemepushstoreListCtrl,AthemepushstoreEditCtrl)(mod);
  newthemestoreConfig(mod);
  return modName;
});
