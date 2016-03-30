define([
  './adblocker.config',
  'common/utils/registerToModule',
  './adblockerfile.list',
  './adblockerfile.edit',
  './adblockerpush.list',
  './adblockerpush.edit',
  './adblockerlocale.list',
  './adblockerlocale.edit'
], function(AdblockerConfig, rtm, 
			AdblockerfileListCtrl,AdblockerfileEditCtrl,
	       	AdblockerpushListCtrl,AdblockerpushEditCtrl,
          AdblockerlocaleListCtrl,AdblockerlocaleEditCtrl) /*invoke*/ {
  var modName = 'app.adblocker',
    mod = angular.module(modName, []);
  	rtm(AdblockerfileListCtrl,AdblockerfileEditCtrl,
  		AdblockerpushListCtrl,AdblockerpushEditCtrl,
      AdblockerlocaleListCtrl,AdblockerlocaleEditCtrl)(mod);

  AdblockerConfig(mod);
  return modName;
});
