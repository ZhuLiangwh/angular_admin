define([
  './promotionservice.config',
  'common/utils/registerToModule',
  './promotionspeeddial.list',
  './promotionspeeddial.edit',
  './promotionurl.list',
  './promotionurl.edit',
], function(promotionserviceConfig, rtm, PromotionspeeddialListCtrl, PromotionspeeddialEditCtrl,PromotionurlListCtrl, PromotionurlEditCtrl) /*invoke*/ {
  var modName = 'app.promotionservice',
      mod = angular.module(modName, []);
  rtm(PromotionspeeddialListCtrl, PromotionspeeddialEditCtrl,PromotionurlListCtrl, PromotionurlEditCtrl)(mod);

  promotionserviceConfig(mod);
  return modName;
});
