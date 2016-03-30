define([], function() {
  return function config(mod) {
    mod.config(['$stateProvider', '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('homepage', {
            abstract: true,
            url: '/homepage',
            template: '<ui-view/>'
          })
          .state('homepage.banner', {
            url: '/banner',
            templateUrl: 'app/homepage/banner.list.html',
            data: {
              model: 'banner',
              action: ['list']
            },
            controller: 'BannerListCtrl'
          })
          .state('homepage.add-banner', {
            url: '/banner/add',
            templateUrl: 'app/homepage/banner.edit.html',
            data: {
              model: 'banner',
              action: ['add']
            },
            controller: 'BannerEditCtrl'
          })
          .state('homepage.edit-banner', {
            url: '/banner/:id',
            templateUrl: 'app/homepage/banner.edit.html',
            data: {
              model: 'banner',
              action: ['edit']
            },
            controller: 'BannerEditCtrl'
          })
          .state('homepage.atlas', {
            url: '/atlas',
            templateUrl: 'app/homepage/atlas.list.html',
            data: {
              model: 'atlas',
              action: ['list']
            },
            controller: 'AtlasListCtrl'
          })
          .state('homepage.add-atlas', {
            url: '/atlas/add',
            templateUrl: 'app/homepage/atlas.edit.html',
            data: {
              model: 'atlas',
              action: ['add']
            },
            controller: 'AtlasEditCtrl'
          })
          .state('homepage.edit-atlas', {
            url: '/atlas/:id',
            templateUrl: 'app/homepage/atlas.edit.html',
            data: {
              model: 'atlas',
              action: ['edit']
            },
            controller: 'AtlasEditCtrl'
          })
          .state('homepage.notice', {
              url: '/notice',
              templateUrl: 'app/homepage/notice.list.html',
              data: {
                model: 'notice',
                action: ['list']
              },
              controller: 'NoticeListCtrl'
            })
            .state('homepage.add-notice', {
              url: '/notice/add',
              templateUrl: 'app/homepage/notice.edit.html',
              data: {
                model: 'notice',
                action: ['add']
              },
              controller: 'NoticeEditCtrl'
            })
            .state('homepage.edit-notice', {
              url: '/notice/:id',
              templateUrl: 'app/homepage/notice.edit.html',
              data: {
                model: 'notice',
                action: ['edit']
              },
              controller: 'NoticeEditCtrl'
            })
            .state('homepage.newsCount', {
              url: '/newsCount',
              templateUrl: 'app/homepage/newscount.list.html',
              data: {
                model: 'newsCount',
                action: ['list']
              },
              controller: 'NewscountListCtrl'
            })
            .state('homepage.add-newsCount', {
              url: '/newsCount/add',
              templateUrl: 'app/homepage/newscount.edit.html',
              data: {
                model: 'newsCount',
                action: ['add']
              },
              controller: 'NewscountEditCtrl'
            })
            .state('homepage.edit-newsCount', {
              url: '/newsCount/:id',
              templateUrl: 'app/homepage/newscount.edit.html',
              data: {
                model: 'newsCount',
                action: ['edit']
              },
              controller: 'NewscountEditCtrl'
            })
            .state('homepage.newsCate', {
              url: '/newsCate',
              templateUrl: 'app/homepage/newscate.list.html',
              data: {
                model: 'newsCate',
                action: ['list']
              },
              controller: 'NewscateListCtrl'
            })
            .state('homepage.add-newsCate', {
              url: '/newsCate/add',
              templateUrl: 'app/homepage/newscate.edit.html',
              data: {
                model: 'newsCate',
                action: ['add']
              },
              controller: 'NewscateEditCtrl'
            })
            .state('homepage.edit-newsCate', {
              url: '/newsCate/:id',
              templateUrl: 'app/homepage/newscate.edit.html',
              data: {
                model: 'newsCate',
                action: ['edit']
              },
              controller: 'NewscateEditCtrl'
            })
            .state('homepage.card', {
              url: '/card',
              templateUrl: 'app/homepage/card.list.html',
              data: {
                model: 'card',
                action: ['list']
              },
              controller: 'CardListCtrl'
            })
            .state('homepage.add-card', {
              url: '/card/add',
              templateUrl: 'app/homepage/card.edit.html',
              data: {
                model: 'card',
                action: ['add']
              },
              controller: 'CardEditCtrl'
            })
            .state('homepage.edit-card', {
              url: '/card/:id',
              templateUrl: 'app/homepage/card.edit.html',
              data: {
                model: 'card',
                action: ['edit']
              },
              controller: 'CardEditCtrl'
            })
            .state('homepage.hotWord', {
              url: '/hotWord',
              templateUrl: 'app/homepage/hotword.list.html',
              data: {
                model: 'hotWord',
                action: ['list']
              },
              controller: 'HotwordListCtrl'
            })
            .state('homepage.add-hotWord', {
              url: '/hotWord/add',
              templateUrl: 'app/homepage/hotword.edit.html',
              data: {
                model: 'hotWord',
                action: ['add']
              },
              controller: 'HotwordEditCtrl'
            })
            .state('homepage.edit-hotWord', {
              url: '/hotWord/:id',
              templateUrl: 'app/homepage/hotword.edit.html',
              data: {
                model: 'hotWord',
                action: ['edit']
              },
              controller: 'HotwordEditCtrl'
            })
            .state('homepage.pictureCate', {
              url: '/pictureCate',
              templateUrl: 'app/homepage/pictureCate.list.html',
              data: {
                model: 'pictureCate',
                action: ['list']
              },
              controller: 'PictureCateListCtrl'
            })
            .state('homepage.add-pictureCate', {
              url: '/pictureCate/add',
              templateUrl: 'app/homepage/pictureCate.edit.html',
              data: {
                model: 'pictureCate',
                action: ['add']
              },
              controller: 'PictureCateEditCtrl'
            })
            .state('homepage.edit-pictureCate', {
              url: '/pictureCate/:id',
              templateUrl: 'app/homepage/pictureCate.edit.html',
              data: {
                model: 'pictureCate',
                action: ['edit']
              },
              controller: 'PictureCateEditCtrl'
            })
            .state('homepage.funnysource', {
              url: '/funnysrc',
              templateUrl: 'app/homepage/funnysrc.list.html',
              data: {
                model: 'funnysource',
                action: ['list']
              },
              controller: 'FunnysrcListCtrl'
            })
            .state('homepage.add-funnysrc', {
              url: '/funnysrc/add',
              templateUrl: 'app/homepage/funnysrc.edit.html',
              data: {
                model: 'funnysource',
                action: ['add']
              },
              controller: 'FunnysrcEditCtrl'
            })
            .state('homepage.edit-funnysrc', {
              url: '/funnysrc/:id',
              templateUrl: 'app/homepage/funnysrc.edit.html',
              data: {
                model: 'funnysource',
                action: ['edit']
              },
              controller: 'FunnysrcEditCtrl'
            })
            .state('homepage.funny', {
              url: '/funny',
              templateUrl: 'app/homepage/funny.list.html',
              data: {
                model: 'funny',
                action: ['list']
              },
              controller: 'FunnyListCtrl'
            })
            .state('homepage.add-funny', {
              url: '/funny/add',
              templateUrl: 'app/homepage/funny.edit.html',
              data: {
                model: 'funny',
                action: ['add']
              },
              controller: 'FunnyEditCtrl'
            })
            .state('homepage.edit-funny', {
              url: '/funny/:id',
              templateUrl: 'app/homepage/funny.edit.html',
              data: {
                model: 'funny',
                action: ['edit']
              },
              controller: 'FunnyEditCtrl'
            })
            //picture
            .state('homepage.picture', {
              url: '/picture',
              templateUrl: 'app/homepage/picture.list.html',
              data: {
                model: 'picture',
                action: ['list']
              },
              controller: 'PictureListCtrl'
            })
            //picture end
            //pictureSubject
            .state('homepage.pictureSubject', {
              url: '/pictureSubject',
              templateUrl: 'app/homepage/pictureSubject.list.html',
              data: {
                model: 'pictureSubject',
                action: ['list']
              },
              controller: 'PictureSubjectListCtrl'
            })
            .state('homepage.add-pictureSubject', {
              url: '/pictureSubject/add',
              templateUrl: 'app/homepage/pictureSubject.edit.html',
              data: {
                model: 'pictureSubject',
                action: ['add']
              },
              controller: 'PictureSubjectEditCtrl'
            })
            .state('homepage.edit-pictureSubject', {
              url: '/pictureSubject/:id',
              templateUrl: 'app/homepage/pictureSubject.edit.html',
              data: {
                model: 'pictureSubject',
                action: ['edit']
              },
              controller: 'PictureSubjectEditCtrl'
            })
            //pictureSubject  end
            //JPNews
            .state('homepage.JPNews', {
              url: '/JPNews',
              templateUrl: 'app/homepage/JPNews.list.html',
              data: {
                model: 'JPNews',
                action: ['list']
              },
              controller: 'JPNewsListCtrl'
            })
            .state('homepage.add-JPNews', {
              url: '/JPNews/add',
              templateUrl: 'app/homepage/JPNews.edit.html',
              data: {
                model: 'JPNews',
                action: ['add']
              },
              controller: 'JPNewsEditCtrl'
            })
            .state('homepage.edit-JPNews', {
              url: '/JPNews/:id',
              templateUrl: 'app/homepage/JPNews.edit.html',
              data: {
                model: 'JPNews',
                action: ['edit']
              },
              controller: 'JPNewsEditCtrl'
            })
            //JPNews  end
            //JPNewsSubCate
            .state('homepage.JPNewsSubCate', {
              url: '/JPNewsSubCate',
              templateUrl: 'app/homepage/JPNewsSubCate.list.html',
              data: {
                model: 'JPNewsSubCate',
                action: ['list']
              },
              controller: 'JPNewsSubCateListCtrl'
            })
            .state('homepage.add-JPNewsSubCate', {
              url: '/JPNewsSubCate/add',
              templateUrl: 'app/homepage/JPNewsSubCate.edit.html',
              data: {
                model: 'JPNewsSubCate',
                action: ['add']
              },
              controller: 'JPNewsSubCateEditCtrl'
            })
            .state('homepage.edit-JPNewsSubCate', {
              url: '/JPNewsSubCate/:id',
              templateUrl: 'app/homepage/JPNewsSubCate.edit.html',
              data: {
                model: 'JPNewsSubCate',
                action: ['edit']
              },
              controller: 'JPNewsSubCateEditCtrl'
            })
            //JPNewsSubCate  end
            //JPNewsCate
            .state('homepage.JPNewsCate', {
              url: '/JPNewsCate',
              templateUrl: 'app/homepage/JPNewsCate.list.html',
              data: {
                model: 'JPNewsCate',
                action: ['list']
              },
              controller: 'JPNewsCateListCtrl'
            })
            .state('homepage.add-JPNewsCate', {
              url: '/JPNewsCate/add',
              templateUrl: 'app/homepage/JPNewsCate.edit.html',
              data: {
                model: 'JPNewsCate',
                action: ['add']
              },
              controller: 'JPNewsCateEditCtrl'
            })
            .state('homepage.edit-JPNewsCate', {
              url: '/JPNewsCate/:id',
              templateUrl: 'app/homepage/JPNewsCate.edit.html',
              data: {
                model: 'JPNewsCate',
                action: ['edit']
              },
                model: 'JPNewsCate',
              controller: 'JPNewsCateEditCtrl'
            })
            //JPNewsCate  end
            //JPNewsSource
            .state('homepage.JPNewsSource', {
              url: '/JPNewsSource',
              templateUrl: 'app/homepage/JPNewsSource.list.html',
              data: {
                model: 'JPNewsSource',
                action: ['list']
              },
              controller: 'JPNewsSourceListCtrl'
            })
            .state('homepage.add-JPNewsSource', {
              url: '/JPNewsSource/add',
              templateUrl: 'app/homepage/JPNewsSource.edit.html',
              data: {
                model: 'JPNewsSource',
                action: ['add']
              },
              controller: 'JPNewsSourceEditCtrl'
            })
            .state('homepage.edit-JPNewsSource', {
              url: '/JPNewsSource/:id',
              templateUrl: 'app/homepage/JPNewsSource.edit.html',
              data: {
                model: 'JPNewsSource',
                action: ['edit']
              },
                model: 'JPNewsSource',
              controller: 'JPNewsSourceEditCtrl'
            })
            //JPNewsSource  end
            //pictureSource
            .state('homepage.pictureSource', {
              url: '/pictureSource',
              templateUrl: 'app/homepage/pictureSource.list.html',
              data: {
                model: 'pictureSource',
                action: ['list']
              },
              controller: 'PictureSourceListCtrl'
            })
            .state('homepage.add-pictureSource', {
              url: '/pictureSource/add',
              templateUrl: 'app/homepage/pictureSource.edit.html',
              data: {
                model: 'pictureSource',
                action: ['add']
              },
              controller: 'PictureSourceEditCtrl'
            })
            .state('homepage.edit-pictureSource', {
              url: '/pictureSource/:id',
              templateUrl: 'app/homepage/pictureSource.edit.html',
              data: {
                model: 'pictureSource',
                action: ['edit']
              },
                model: 'pictureSource',
              controller: 'PictureSourceEditCtrl'
            })
            //pictureSource  end

            
        /*add state to here*/
      }
    ]);
    return mod;
  };
});
