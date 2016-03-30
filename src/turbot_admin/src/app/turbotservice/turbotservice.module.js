define([
  './turbotservice.config',
  'common/utils/registerToModule',
  './ad.list',
  './ad.edit',
  './adpos.list',
  './adpos.edit',
  './adpush.list',
  './adpush.edit',
  './adsource.list',
  './adsource.edit',
  './adgroup.list',
  './adgroup.edit',
  './adstatistics'
], function(turbotserviceConfig, rtm, AdListCtrl, AdEditCtrl, AdposListCtrl, AdposEditCtrl, AdpushListCtrl, AdpushEditCtrl, AdsourceListCtrl, AdsourceEditCtrl,AdgroupListCtrl, AdgroupEditCtrl, AdstatisticsCtrl) /*invoke*/ {
  var modName = 'app.turbotservice',
    mod = angular.module(modName, []);
  rtm(AdListCtrl, AdEditCtrl, AdposListCtrl, AdposEditCtrl, AdpushListCtrl, AdpushEditCtrl, AdsourceListCtrl, AdsourceEditCtrl,AdgroupListCtrl, AdgroupEditCtrl,AdstatisticsCtrl)(mod);

  turbotserviceConfig(mod);
  return modName;
});
