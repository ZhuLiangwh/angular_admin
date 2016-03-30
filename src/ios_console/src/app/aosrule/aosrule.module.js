define([
  './aosrule.config',
  'common/utils/registerToModule',
  './aosoperator.list',
  './aosoperator.edit',
  './aospackage.list',
  './aospackage.edit',
  './aosruledata.list',
  './aosruledata.edit',
  './aossource.list',
  './aossource.edit',
  './aoslocale.list',
  './aoslocale.edit'
], function(AosruleConfig, rtm, AosoperatorListCtrl, AosoperatorEditCtrl, AospackageListCtrl, AospackageEditCtrl, AosruledataListCtrl, AosruledataEditCtrl, AossourceListCtrl, AossourceEditCtrl, AoslocaleListCtrl, AoslocaleEditCtrl) /*invoke*/ {
  var modName = 'app.rule',
    mod = angular.module(modName, []);
  rtm(AosoperatorListCtrl, AosoperatorEditCtrl, AospackageListCtrl, AospackageEditCtrl, AosruledataListCtrl, AosruledataEditCtrl, AossourceListCtrl, AossourceEditCtrl, AoslocaleListCtrl, AoslocaleEditCtrl)(mod);
  AosruleConfig(mod);
  return modName;
});
