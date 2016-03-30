define([
  './homepage.config',
  'common/utils/registerToModule',
  './banner.list',
  './banner.edit',
  './atlas.list',
  './atlas.edit',
  './notice.list',
  './notice.edit',
  './newscount.list',
  './newscount.edit',
  './newscate.list',
  './newscate.edit',
  './card.list',
  './card.edit',
  './hotword.list',
  './hotword.edit',
  './funny.list',
  './funny.edit',
  './funnysrc.list',
  './funnysrc.edit',
  './picture.list',
  './picture.edit'
], function(homepageConfig, rtm, BannerListCtrl,BannerEditCtrl,AtlasListCtrl,AtlasEditCtrl,NoticeListCtrl,NoticeEditCtrl,NewscountListCtrl,NewscountEditCtrl,NewscateListCtrl,NewscateEditCtrl,CardListCtrl,CardEditCtrl,HotwordListCtrl,HotwordEditCtrl,FunnyListCtrl,FunnyEditCtrl,FunnysrcListCtrl,FunnysrcEditCtrl,PictureListCtrl,PictureEditCtrl) /*invoke*/ {
  var modName = 'app.homepage',
    mod = angular.module(modName, []);
  rtm(BannerListCtrl,BannerEditCtrl,AtlasListCtrl,AtlasEditCtrl,NoticeListCtrl,NoticeEditCtrl,NewscountListCtrl,NewscountEditCtrl,NewscateListCtrl,NewscateEditCtrl,CardListCtrl,CardEditCtrl,HotwordListCtrl,HotwordEditCtrl,FunnyListCtrl,FunnyEditCtrl,FunnysrcListCtrl,FunnysrcEditCtrl,PictureListCtrl,PictureEditCtrl)(mod);

  homepageConfig(mod);
  return modName;
});
