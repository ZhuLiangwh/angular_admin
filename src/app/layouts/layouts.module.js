define([
    './layouts.config',
    './body',
    './user.setting',
    './topbar/topbar',
    'common/utils/registerToModule'
  ],
  function(layoutsConfig,bodyCtrl, userSettingCtrl, TopbarCtrl, rtm) {
    var modName = 'app.layouts',
      mod = angular.module(modName, []);
    rtm(bodyCtrl, userSettingCtrl,TopbarCtrl)(mod);
    layoutsConfig(mod);
    return modName;
  });
