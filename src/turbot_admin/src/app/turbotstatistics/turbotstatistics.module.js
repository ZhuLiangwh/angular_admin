define([
    './turbotstatistics.config',
    'common/utils/registerToModule', './adpostat', './adsrcstat'
    /*insertrjs*/
], function(turbotstatisticsConfig, rtm, AdpostatListCtrl, AdsrcstatListCtrl /*insertparam*/ ) {
    var modName = 'app.turbotstatistics',
        mod = angular.module(modName, []);
    rtm(AdpostatListCtrl, AdsrcstatListCtrl /*insertparam*/ )(mod);
    turbotstatisticsConfig(mod);
    return modName;
});
