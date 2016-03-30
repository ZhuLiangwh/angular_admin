define([
  './revenueservice.config',
  'common/utils/registerToModule',
  './addondownloadurl.list',
  './addondownloadurl.edit',
  './rateusoptimization.list',
  './rateusoptimization.edit',
  './addonvideoinfo.list',
  './addonvideoinfo.edit',

  './dolphinwidgeturl.list',
  './dolphinwidgeturl.edit',
  './intervalfunc.list',
  './intervalfunc.edit'
  // './searchhotwords.list',
  // './searchhotwords.edit'
], function(revenueserviceConfig, rtm, AddondownloadurlListCtrl,AddondownloadurlEditCtrl, RateusoptimizationListCtrl, RateusoptimizationEditCtrl,AddonvideoinfoListCtrl,AddonvideoinfoEditCtrl,DolphinwidgeturlListCtrl,DolphinwidgeturlEditCtrl,IntervalfuncListCtrl,IntervalfuncEditCtrl) /*invoke*/ {
  var modName = 'app.revenueservice',
    mod = angular.module(modName, []);
  rtm(AddondownloadurlListCtrl,AddondownloadurlEditCtrl, RateusoptimizationListCtrl, RateusoptimizationEditCtrl,AddonvideoinfoListCtrl,AddonvideoinfoEditCtrl,DolphinwidgeturlListCtrl,DolphinwidgeturlEditCtrl,IntervalfuncListCtrl,IntervalfuncEditCtrl)(mod);

  revenueserviceConfig(mod);
  return modName;
});
