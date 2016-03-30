define([
    './body',
    './leftnav/leftnav',
    'common/utils/registerToModule'
  ],
  function(bodyCtrl, LeftnavCtrl, rtm) {
    var modName = 'app.layouts',
      mod = angular.module(modName, []);
    rtm(bodyCtrl, LeftnavCtrl)(mod);
    return modName;
  });
