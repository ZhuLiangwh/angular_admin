define([
  './apiService',
  'common/utils/registerToModule',
  './aosoperator',
  './aospackage',
  './aosruledata',
  './aossource',
  './aoslocale',
  './icon',
  './banner',
  './atlas',
  './notice',
  './newscount',
  './newscate',
  './card',
  './hotword',
  './funny',
  './funnysrc',
  './pictureCate',
  './usermanagement',
  './picture',
  './pictureSubject',
  './JPNews',
  './JPNewsSubCate',
  './JPNewsCate',
  './JPNewsSource',
  './pictureSource',
  './grayswitch',
  './whiteList'
], function(apiService, rtm, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, banner, 
            atlas, notice, newscount, newscate, card, hotword, funny, funnysrc, pictureCate, usermanagement, 
            picture, pictureSubject, JPNews, JPNewsSubCate, JPNewsCate, JPNewsSource, pictureSource,grayswitch,whiteList) /*invoke*/ {
            // picture, pictureSubject, JPNews, JPNewsSubCate, JPNewsCate, JPNewsSource, pictureSource,grayswitch) /*invoke*/ {
  var modName = 'app.ds',
    mod = angular.module(modName, []);
  rtm(apiService, aosoperator, aospackage, aosruledata, aossource, aoslocale, icon, banner, atlas, 
      notice, newscount, newscate, card, hotword, funny, funnysrc, pictureCate, usermanagement ,
      picture, pictureSubject, JPNews, JPNewsSubCate, JPNewsCate, JPNewsSource, pictureSource,grayswitch,whiteList)(mod);
      // picture, pictureSubject, JPNews, JPNewsSubCate, JPNewsCate, JPNewsSource, pictureSource,grayswitch)(mod);

  return modName;
});